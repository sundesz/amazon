import axios from 'axios'

const instance = axios.create({

    // The API (cloud function) URL
    // baseURL: "https://us-central1-challenge-edb99.cloudfunctions.net/api"
    baseURL: window.location.origin.includes('localhost') ? "http://localhost:5001/challenge-edb99/us-central1/api" : "https://us-central1-challenge-edb99.cloudfunctions.net/api"
})

export default instance