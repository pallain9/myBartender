const Alexa = require('ask-sdk-core')
const axios = require('axios')

/*
"name": "AMAZON.FallbackIntent"
"name": "AMAZON.CancelIntent"
"name": "AMAZON.HelpIntent"
"name": "AMAZON.StopIntent"
"name": "AMAZON.NavigateHomeIntent"
"name": "RecipeIntent" 
"name": "AlcoholDrinkIntent"
"name": "RandomDrinkIntent"
"name": "IngredientIntent"
*/

async function getDrinkRecipe(drink, key) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    const response = await axios.get(url)

    return response.data[key]
}

async function getRandomDrink(drink, key) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    const response = await axios.get(url)

    return response.data[key]
}

async function getIngredients(drink, key) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    const response = await axios.get(url)

    return response.data[key]
}


const RecipeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RecipeIntent'
    },
    async handle(handlerInput) {
        const drink = handlerInput.requestEnvelope.request.intent.slots.strDrink.value
        const recipe = await getDrinkRecipe(drink, 'strInstructions')

        const answer = `${drink}, excellent choice.  Are you ready?  ${recipe}.`
        const reprompt = 'Would you like another drink?'

        return handlerInput.responseBuilder
            .speak(answer + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse()
    },
}

/*const RandomDrinkIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RecipeIntent'
    },
    async handle(handlerInput) {
        const randomDrink = handlerInput.requestEnvelope.request.intent.slots.strDrink.value
        const recipe = await getDrinkRecipe (randomDrink, 'strInstructions')

        const answer = `${drink}, excellent choice.  Are you ready?  ${recipe}.`
        const reprompt = 'Would you like another drink?'

        return handlerInput.responseBuilder
            .speak (answer + reprompt)
            .reprompt (reprompt)
            .withShouldEndSession (false)
            .getResponse ()
    },
}*/

const IngredientIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'IngredientIntent'
    },
    async handle(handlerInput) {
        const drink = handlerInput.requestEnvelope.request.intent.slots.strDrink.value
        const recipe = await getDrinkRecipe(drink, 'strMeasure + strIngredient')

        const answer = `Sounds good! Here is what you need to make${drink}. You will need ${recipe}.`
        const reprompt = 'Do you need the ingredients for another drink?'

        return handlerInput.responseBuilder
            .speak(answer + reprompt)
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
        const guidance = 'MyBartender can get you a drink recipe or the ingredients for a drink.  For example, "MyBartender, how do I make an old-fashioned?"'
        const reprompt = 'What recipe can I teach you?'

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
    handle() {
        const errorMessage = 'It appears our kegs are tapped and we are out of liquor!  Please try again later.'
        return handlerInput.responseBuilder
            .speak(errorMessage)
            .withShouldEndSession(true)
            .getResponse()
    }
}
const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder.addRequestHandlers(
    RecipeIntentHandler,
    IngredientIntentHandler,
    CancelandStopIntentHandler,
    ErrorHandler,
    HelpIntentHandler,
    FallbackIntentHandler,
).lambda()