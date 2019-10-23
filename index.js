const Alexa = require('ask-sdk-core')

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

async function getDrinkRecipe(strInstructions, key))

const RecipeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RecipeIntent'
    },

}