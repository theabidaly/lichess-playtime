json_information = null

// decryption function
function decrypt(plaintext)
{
    ciphertext = ""

    for(idx in plaintext)
    {
        ciphertext += String.fromCharCode((plaintext.charCodeAt(idx))^(idx%6+2))
    }

    return ciphertext
}

// on load
window.addEventListener('load', onLoad)
function onLoad()
{    
    submit_button = document.getElementById("submit-button")
    input = document.getElementById("input-text")
    text = document.getElementById("text")
    

    submit_button.addEventListener("click", function ()
    {
        if(getUsername() == "") return;
        apiCall()
    })

    input.addEventListener("focus", function()
    {
        if(input.value == "Enter Lichess username")
        {
            input.value = ""
            input.style.color = "var(--ruby)"
        }
    })

    input.addEventListener("focusout", function()
    {
        if(input.value == "")
        {
            input.value = "Enter Lichess username"
            input.style.color = "var(--slate)"
        }
    })
}

// get text from input text return nothing if blank
function getUsername()
{
    if(input.value == "Enter Lichess username")
    {
        return "";
    }
    return document.getElementById("input-text").value;
}

// call api
async function apiCall()
{
    const chip1 = "njtZSkJgp23li7=LPO3S1vvJ"

    try
    {
        const response = await fetch(`https://lichess.org/api/user/${getUsername()}?trophies=false&profile=true&rank=false&fideId=false`, {
            headers: {
                Authorization: `Bearer ${decrypt(chip1)}`
            }
        })
        
        const text = await response.text()

        json_information = JSON.parse(text)
    }
    catch(e)
    {
        console.log("Error");
    }

    console.log(json_information)
}

//