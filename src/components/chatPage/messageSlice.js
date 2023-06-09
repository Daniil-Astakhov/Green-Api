import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState({
    messages: [],
    nickName: '',
    chatId: [],
    userName: []

});

const messageSlice = createSlice({ 
    name: 'message',
    initialState,
    reducers: {
        messageChanged: (state, action) => {
            state.messages.push(action.payload);
        },
        nickNameChanged: (state, action) => {
            state.nickName = action.payload;
        },
        chatIdChanged: (state, action) => {
            state.chatId = [action.payload+'@c.us'];
        },
        userNamedChanged: (state, action) => {
            state.userName = [action.payload];
        }
    },
});

const {actions, reducer} = messageSlice;

export default reducer;

export const {selectAll} = messageAdapter.getSelectors(state => state.messages);

export const {
    messageChanged,
    nickNameChanged,
    chatIdChanged,
    userNamedChanged
} = actions;
