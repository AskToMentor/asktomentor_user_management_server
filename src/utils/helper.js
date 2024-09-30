"use strict";

const oneDayMillisecond = 24 * 60 * 60 * 1000;
const oneWeekMillisecond = 7 * 24 * 60 * 60 * 1000;
const sqsConfiguration = require("../configuration/sqs.js")();
const {
    basicConfigurationObject 
} = require("./constants.js");
const crypto = require("crypto");

// const ShortUniqueId =  require("short-unique-id");
// const uid = new ShortUniqueId();
class Helper{
    phoneNumberValidation(phoneNumber){
        const regex = /^[6-9]\d{9}$/;
        
        return regex.test(phoneNumber);
    }
    
    getRandomOTP (min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }
    generateUserId() {
        // Generate a random 8-digit number
        const userId = crypto.randomInt(10000000, 99999999);
    
        return userId;
    }

    async getMonthNumber(date) {
        const reference_date = new Date(parseFloat(basicConfigurationObject.REFERENCE_START_DATE));
        const currentDate = date ? new Date(date) : new Date();

        let months = (currentDate.getFullYear() - reference_date.getFullYear()) * 12;

        months -= reference_date.getMonth();
        months += currentDate.getMonth();
        console.log("months", months);

        return months <= 0 ? 0 : months;
    }

    async getWeekNumber(date) {
        const currentDate = date ? new Date(date).getTime() : new Date().getTime();

        const reference_date = new Date(parseFloat(basicConfigurationObject.REFERENCE_START_DATE));
        const reference_week_start = basicConfigurationObject.REFERENCE_START_DATE - (reference_date.getDay() * oneDayMillisecond);

        const difference = currentDate - reference_week_start;
        const week_difference = difference / oneWeekMillisecond;

        return Math.floor(week_difference);
    }
    async getDayNumber(date) {
        const currentDate = date ? new Date(date).getTime() : new Date().getTime();
        const difference = currentDate - parseFloat(basicConfigurationObject.REFERENCE_START_DATE);
        const day_difference = difference / oneDayMillisecond;

        return Math.floor(day_difference);
    }

    publishQueueMessage(body, SQS_QUEUE_URL = basicConfigurationObject.SQS_QUEUE_URL) {
        console.log("amqpChannel", SQS_QUEUE_URL );
        console.log("Publising message in ", "body %%%%%%%%%%", JSON.stringify(body));
        const params = {
            // DelaySeconds: 10,
            
            MessageBody: JSON.stringify(body),
            // MessageAttributes: {},
            //     Author: {
            //         DataType: "String",
            //         StringValue: "John Doe"
            //     },
            //     Title: {
            //         DataType: "String",
            //         StringValue: "Test Message"
            //     }
            // MessageGroupId: uid.rnd(32),
            QueueUrl: SQS_QUEUE_URL
        };
          
        sqsConfiguration.sendMessage(params, (err, data) => {
            if (err) 
                console.error("Error", err);
            else 
                console.log("Success", data.MessageId);
        });
    }
    
    acknowledgeMessage(message) {
        const receiveParams = {
            // Specify the URL of your SQS queue
            MaxNumberOfMessages: 10, 
            QueueUrl: basicConfigurationObject.SQS_QUEUE_URL
        };

        // Acknowledge the message (delete it from the queue)
        const deleteParams = {
            QueueUrl: receiveParams.QueueUrl,
            ReceiptHandle: message.ReceiptHandle
        };

        sqsConfiguration.deleteMessage(deleteParams, (deleteErr, deleteData) => {
            if (deleteErr) 
                console.error("Error deleting message:", deleteErr);
            else 
                console.log("Message deleted:", message.MessageId);
        });
    }

    // socket events
    emitToUser(userId, eventName, data) {
        console.log("emitToUser", userId, eventName, data);
        const obj = {
            data,
            eventName,
            eventType: "emitToUser",
            module_name: "MODULE_ADMIN_SERVER",
            type: "sockets",
            userId
        };

        this.publishQueueMessage(obj, basicConfigurationObject.SQS_SOCKET_QUEUE_URL);
    }
    async incrementIdConnectionKey(t, key){
        console.log("incrementIdConnectionKey working", key);
        try {
            const record = await id_connection.findOne({
                where: {
                    key
                }
            });

            if (record){
                await id_connection.increment({
                    count: 1
                }, {
                    transaction: t,
                    where: {
                        key
                    }
                });
                await record.reload({
                    transaction: t  
                });

                return record.count;
            }
            else {
                const newRecord = await id_connection.create({
                    count: 1,
                    key 
                }, {
                    transaction: t 
                });

                return newRecord.count;
            }
        }
        catch (error) {
            console.error("Error while incrementIdConnectionKey", error);

            return error;
        }
    }
}

module.exports =  new Helper();