import { deleteRequest, getPlumbers, getRequests, sendCompletion } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }
                   
             sendCompletion(completion)

             
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
   
    
    const convertRequestToListElement = (each) => {
      
        return `
    <li>
        
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${each.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
${each.description}
        <button class="request__delete"
                id="request--${each.id}">
            Delete
        </button>
    </li>
` 
    }
    
    let html = `
        <ul>
            ${
                getRequests().map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}


