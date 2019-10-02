# telemetry-core-bot

This bot would show telemtry logging in application insights, and review in powerbi.

This bot has been created using `yo botbuilder` command line. And, selected `Javascript` as language along with `Core Bot` template.

## Prerequisites

This sample **requires** prerequisites in order to run.

### Overview

This bot uses [LUIS](https://www.luis.ai), an AI based cognitive service, to implement language understanding.

- [Node.js](https://nodejs.org) version 10.14.1 or higher

    ```bash
    # determine node version
    node --version
    ```

### Create application insights resource

- make a note of instrumentation key
- for powerbi portion, necessary key details need be generated as [here](https://microsoft.github.io/botframework-solutions/reference/analytics/powerbi/)

### Create a Bot Channels Registration

- create bot channels registration
- make a note of appid/ password
- update the bot channels registration with correct appinsights key value

### Create a LUIS Application to enable language understanding

- LUIS language model setup, training, and application configuration steps can be found [here](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-luis?view=azure-bot-service-4.0).
- For this project, the json definition for luis app is kept [here](./cognitiveModels/FlightBooking.json).
- Make sure to create a luis app, and name it as `FlightBooking`, and import the definition as in said JSON file.
- Basically, the JSON file have two major intents `GetWeather` and `BookFlight`. 
- The `GetWeather` intent would be utilized to make a further qna maker service call. 
- The `BookFlight` intent would be utilized to just for intent understanding in the flight booking flow.

### Create a qna maker service application

- name the kb as `weatherkb`
- set the source FAQ URL as `https://public.wmo.int/en/about-us/FAQs/faqs-weather`
- make sure earlier created application insights is configured for qna maker service app

# To run the bot

- Install modules

    ```bash
    npm install
    ```
- Setup LUIS

The prerequisite outlined above contain the steps necessary to provision a language understanding model on www.luis.ai.  Refer to _Create a LUIS Application to enable language understanding_ above for directions to setup and configure LUIS.

- Start the bot

    ```bash
    npm start
    ```

- Or, have the app run in debug mode

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.3.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

