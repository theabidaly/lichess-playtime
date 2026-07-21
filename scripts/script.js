import axios from 'axios'

function encrypt(plaintext)
{
    ciphertext = ""

    for(idx in plaintext)
    {
        ciphertext += String.fromCharCode((plaintext.charCodeAt(idx))^(idx%6+2))
    }

    return ciphertext
}

window.addEventListener('load', onLoad)

function onLoad()
{    
    button = document.getElementById("submit_button")

    text = document.getElementById("text")

    text.innerHTML = "one"
    
    apiCall

    button.addEventListener("click", function () {
        document.getElementById("text").innerHTML = document.getElementById("input_text").value
    })
}

async function apiCall()
{
    const chip1 = "njtZSkJgp23li7=LPO3S1vvJ"

    const options = {
        method: 'GET',
        url: 'https://lichess.org/api/user/{username}',
        params: {
            trophies: 'false',
            profile: 'true',
            rank: 'false',
            fideId: 'false'
        },
        headers: {
            Authorization: `Bearer ${encrypt(chip1)}`
        }
    }

    try {
        const { data } = await axios.request(options)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}