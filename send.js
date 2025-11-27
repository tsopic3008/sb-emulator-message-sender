const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";
const queueName = "cp.queue.1";
const jsonBody = {
   //paste your JSON body here      
};

async function main() {
    console.log("🚀 Connecting to Service Bus Emulator...");

    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);

    try {
        const message = {
            body: jsonBody,
            contentType: "application/json",
            applicationProperties: {
                "MachineName": "EFG-ED0-V01-059",
                "UserName":    "HR80037",
                "Event":       "create-consent",
                "Entity":      "ConsentModel",
                "EntityId":    "1546651",
                //"Type":        "lead_updated"
            }
        };

        console.log(`📤 Sending message to queue: '${queueName}'...`);
        console.log(`   Properties:`, message.applicationProperties);
        // console.log(`   Body Preview:`, JSON.stringify(message.body).substring(0, 50) + "...");
        
        await sender.sendMessages(message);

        console.log("✅ Message sent successfully!");

    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await sender.close();
        await sbClient.close();
    }
}

main();