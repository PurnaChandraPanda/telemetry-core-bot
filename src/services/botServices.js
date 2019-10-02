const { LuisRecognizer, QnAMaker } = require("botbuilder-ai");
const { DispatchService, LuisService } = require("botframework-config");

class BotServices {
    constructor(settings, telemetryClient) {
        this.cognitiveModelSets = new Map();
        const luisPredictionOptions = {
            telemetryClient: telemetryClient,
            logPersonalInformation: true
        };
        if (settings.cognitiveModels !== undefined) {
            settings.cognitiveModels.forEach((value, key) => {
                const language = key;
                const config = value;
                const dispatchModel = new DispatchService(config.dispatchModel);
                const dispatchApp = {
                    applicationId: dispatchModel.appId,
                    endpointKey: dispatchModel.subscriptionKey,
                    endpoint: dispatchModel.getEndpoint()
                };
                const cognitiveModelSet = {
                    dispatchService: new LuisRecognizer(dispatchApp, luisPredictionOptions),
                    luisServices: new Map(),
                    qnaServices: new Map()
                };
                if (config.languageModels !== undefined) {
                    config.languageModels.forEach((model) => {
                        const luisService = new LuisService(model);
                        const luisApp = {
                            applicationId: luisService.appId,
                            endpointKey: luisService.subscriptionKey,
                            endpoint: luisService.getEndpoint()
                        };
                        cognitiveModelSet.luisServices.set(luisService.id, new LuisRecognizer(luisApp, luisPredictionOptions));
                    });
                }
                if (config.knowledgeBases !== undefined) {
                    config.knowledgeBases.forEach((kb) => {
                        const qnaEndpoint = {
                            knowledgeBaseId: kb.kbId,
                            endpointKey: kb.endpointKey,
                            host: kb.hostname
                        };
                        cognitiveModelSet.qnaServices.set(kb.id, new QnAMaker(qnaEndpoint, undefined, telemetryClient, true));
                    });
                }
                this.cognitiveModelSets.set(language, cognitiveModelSet);
            });
        }
    }
}

exports.BotServices = BotServices;