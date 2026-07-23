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
    
    toggleInformation();

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

// hide/unhide information
function toggleInformation(willCheck, checkedVal)
{
    a = willCheck || false;
    b = checkedVal || false;
    info = document.getElementsByClassName("info")

    for(element of info)
    {
        if(willCheck && element.getAttribute("hidden") != checkedVal) continue;
        element.toggleAttribute("hidden")
    }
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

//convert seconds to minutes/hours
function convertTimeFromSeconds(time)
{
    if(time < 100)
        return [time, "sec"]
    if(time < 6000)
        return [Math.floor(time/60), "min"]
    return[Math.floor(time/3600), "hrs"]
}
function getLifetime(time)
{
    elapsedTime = Date.now() - time;
    return Math.floor(elapsedTime/86400000)
}
function getActivity(playtime, lifespan)
{
    lifespan = lifespan/1000
    return Math.round((playtime/lifespan)*100000)/1000
}

// call api
async function apiCall()
{
    const chip1 = "njtZSkJgp23li7=LPO3S1vvJ"
    json_information = null

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

    toggleInformation(true, false)

    playtime = document.getElementById("playtime")
    playtimeUnit = document.getElementById("playtime-unit")
    lifetime = document.getElementById("lifetime")
    bulletRating = document.getElementById("bullet-rating")
    blitzRating = document.getElementById("blitz-rating")
    rapidRating = document.getElementById("rapid-rating")

    playtime.innerHTML = convertTimeFromSeconds(json_information.playTime.total)[0]
    playtimeUnit.innerHTML = convertTimeFromSeconds(json_information.playTime.total)[1]
    lifetime.innerHTML = getLifetime(json_information.createdAt)
    bulletRating.innerHTML = json_information.perfs.bullet.rating
    blitzRating.innerHTML = json_information.perfs.blitz.rating
    rapidRating.innerHTML = json_information.perfs.rapid.rating
}