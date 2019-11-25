const Alexa = require('ask-sdk-core')
const axios = require('axios')
const skillBuilder = Alexa.SkillBuilders.custom();


async function getInsult() {
    const response = await axios.get(`https://evilinsult.com/generate_insult.php?lang=en&type=json`)

    return response.data.insult
}
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        const homeText = "Looking for something to bring you down a peg?  You have come to the right place!  Would you like an insult?"
        const reprompt = 'I am begging you, let me dis you!'

        return handlerInput.responseBuilder
            .speak(homeText + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    }
}

const InsultIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'InsultIntent'
    },
    async handle(handlerInput) {
        const insult = await getInsult()
        const reprompt = 'Would you like another insult?'

        return handlerInput.responseBuilder
            .speak(insult)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    },
}

const CancelandStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .withShouldEndSession(true)
            .getResponse()
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        const guidance = 'Insult Me can do just that.  Insult you.  So stop being a wimp and ask for an insult!!'
        const reprompt = 'can you handle an insult?'

        return handlerInput.responseBuilder
            .speak(guidance + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    }
}

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
    },
    handle(handlerInput) {
        const guidance = "I'm sorry, I did not get that.  are you ready to be insulted?"
        const reprompt = 'Please, let me insult you!'

        return handlerInput.responseBuilder
            .speak(guidance + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    }
}

const ErrorHandler = {
    canHandle() {
        return true
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('It appears I have turned a new leaf.  I will not insult you, but try me later!')
            .withShouldEndSession(true)
    }
}

const NavigateHomeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent'
    },
    handle(handlerInput) {
        const homeText = "Looking for something to bring you down a peg?  You have come to the right place!  Would you like an insult?"
        const reprompt = 'I am begging you, let me dis you!'

        return handlerInput.responseBuilder
            .speak(homeText + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    }
}

const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
    },
    handle(handlerInput) {
        const speechText = 'had enough?  come back later if you dare!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse()
    },
}

const YesIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
    },
    async handle(handlerInput) {
        const insult = await getInsult()

        return handlerInput.responseBuilder
            .speak(`Here is your insult: <break strength='strong' />${insult}<break strength='strong' /> Would you like another dis?`)
            .reprompt('Would you like more words from the genius?')
            .withShouldEndSession(false)
            .getResponse()
    },
}

exports.handler = skillBuilder.addRequestHandlers(
    NavigateHomeIntentHandler,
    InsultIntentHandler,
    CancelandStopIntentHandler,
    HelpIntentHandler,
    FallbackIntentHandler,
    LaunchRequestHandler,
    YesIntent,
    NoIntentHandler
)
    .addErrorHandler(ErrorHandler)
    .lambda()

