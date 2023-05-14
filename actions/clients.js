import {
    ADD_CLIENTS,
    ADD_CLIENTS_REQUEST,
    CREATE_CLIENT_MODAL,
    GET_CLIENTS,
    GET_CLIENTS_REQUEST,
    GET_EVENTS,
    INVITE_CLIENT,
} from "../constants/Action_types";

import axios from "axios";

export const uri = "https://react.ohmynote.com";

const fetcher = axios.create({
    baseURL: uri,
    headers: {
        "Content-Type": "application/json",
    },
});

// Action Types
export const getClientsRequest = () => {
    return {
        type: GET_CLIENTS_REQUEST,
    };
};

export const getClients = (clients, next, prev, count) => {
    return {
        type: GET_CLIENTS,
        payload: clients,
        next: next,
        prev: prev,
        count: count,
    };
};

export const createClientModal = (displayData) => {
    return {
        type: CREATE_CLIENT_MODAL,
        payload: displayData,
    };
};

export const addClientsRequest = () => {
    return {
        type: ADD_CLIENTS_REQUEST,
    };
};

export const addClient = (client) => {
    return {
        type: ADD_CLIENTS,
        payload: client,
    };
};

export const inviteClient = (message, status) => {
    return {
        type: INVITE_CLIENT,
        payload: message,
        status: status,
    };
};

// Event Action Type
export const getEvents = (events) => {
    return {
        type: GET_EVENTS,
        payload: events,
    };
};

// Actions
export const getClientsAction = (token) => {
    return function (dispatch) {
        dispatch(getClientsRequest());
        fetcher
            .get(`clients/clients`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                const clients = res.data.results;
                const next = res.data.next;
                const prev = res.data.previous;
                const count = res.data.count;

                dispatch(getClients(clients, next, prev, count));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getClientsPaginateAction = (token, url) => {
    return function (dispatch) {
        dispatch(getClientsRequest());
        fetcher
            .get(url, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                const clients = res.data.results;
                const next = res.data.next;
                const prev = res.data.previous;
                const count = res.data.count;

                dispatch(getClients(clients, next, prev, count));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const addClientAction = (token, data) => {
    // console.log(data)
    return function (dispatch) {
        dispatch(addClientsRequest());
        fetcher
            .post(`clients/clients/`, data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                const client = res.data;
                console.log(client);
                console.log("Data Added");

                dispatch(addClient(client));

                getClientsAction(token);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const inviteClientAction = (token, data) => {
    // console.log(data)
    return function (dispatch) {
        dispatch(addClientsRequest());

        fetcher
            .get(`api/deepnoze/invitebyemail?email=${data.email}&first_name=${data.first_name}&last_name=${data.last_name}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                // console.log(res.data);
                const status = res.data.status;
                if (status.toLowerCase() == "ok") {
                    const message = "Invite has been sent";
                    dispatch(inviteClient(message, status));
                } else {
                    const message = "Invite already send";
                    // const message = res.data.Error;
                    dispatch(inviteClient(message, status));
                }
            })
            .catch((err) => console.log(err));
    };
};

export const getEventsAction = (token) => {
    return function (dispatch) {
        fetcher
            .get(`api/deepnoze/calendar/month/deepnoze/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                const data = res.data.events;
                let events = [];

                data.map((event) => {
                    let hour = (new Date(event.start)).getHours();
                    let hourFormat = hour < 10 ? "0" + hour : hour;

                    let minutes = new Date(event.start).getMinutes();

                    events.push({
                        id: event.id,
                        start: event.start,
                        end: event.end,
                        title: hourFormat + ":" + minutes + " - " + event.title,
                        titleText: event.title,
                        description: event.description,
                        color_event: event.color_event,
                        creator: event.creator,
                    });
                });

                dispatch(getEvents(events));
            })
            .catch((err) => console.log(err));
    };
};