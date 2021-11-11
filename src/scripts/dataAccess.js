



const mainContainer = document.querySelector("#container")

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []

}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (param) => {
                // Store the external state in application state
                applicationState.completions = param
            }
        )
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (param) => {
                // Store the external state in application state
                applicationState.plumbers = param
            }
        )
}


export const getRequests = () => {
    const requestMap = applicationState.requests.map(
        (requestObj) => {
            const foundComplete = applicationState.completions.find(
                (completionObj) => {

                    if (completionObj.requestId === requestObj.id) {
                        return true
                    }
                    return false
                }
            )
            const newRequestObj = { ...requestObj }
            newRequestObj.completed = foundComplete ? true : false
            return newRequestObj


        }
    )
    requestMap.sort(
        (object2, object1) => {
            if (object2.completed === object1.completed) {
                return 0
            } else {
                if (object2.completed) {
                    return 1
                } else {
                    return -1
                }
            }
        }
    )
    return requestMap
}



export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}
export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendCompletion = (userServiceRequest) => {
    const sendOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/completions`, sendOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}





