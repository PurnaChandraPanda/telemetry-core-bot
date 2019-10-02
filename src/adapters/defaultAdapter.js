const { BotFrameworkAdapter, TranscriptLoggerMiddleware, TelemetryLoggerMiddleware, AutoSaveStateMiddleware } = require("botbuilder");
const { AzureBlobTranscriptStore } = require("botbuilder-azure");
//const { SetLocaleMiddleware, EventDebuggerMiddleware } = require("botbuilder-solutions");

class DefaultAdapter extends BotFrameworkAdapter{
    constructor(settings, adapterSettings, telemetryClient, userState, conversationState) {
        super(adapterSettings);
        
        this.onTurnError = async (context, error) => {
            await context.sendActivity({
                type: this.ActivityTypes.Trace,
                text: error.message
            });
            await context.sendActivity({
                type: this.ActivityTypes.Trace,
                text: error.stack
            });

            telemetryClient.trackException({ exception: error });
        };

        const transcriptStore = new AzureBlobTranscriptStore({
            containerName: settings.blobStorage.container,
            storageAccountOrConnectionString: settings.blobStorage.connectionString
        });
        this.use(new TranscriptLoggerMiddleware(transcriptStore));
        this.use(new TelemetryLoggerMiddleware(telemetryClient, true));
        //this.use(new SetLocaleMiddleware('en-us')); // todo
        //this.use(new EventDebuggerMiddleware());
        // Use the AutoSaveStateMiddleware middleware to automatically read and write conversation and user state.
        this.use(new AutoSaveStateMiddleware(conversationState, userState));
    }
}

exports.DefaultAdapter = DefaultAdapter;