// import {
//     SET_INCORRECT_ON_WHOLE_WORD,
//     SET_INIT_STATE,
//     SET_STATE,
//     WordActionType,
// } from "../../store/actions/wordStateAction";
// import { wordReducer } from "../../store/reducers/wordReducer";

// describe("wordReducer", () => {
//     it("should set state of specific letter in specific word", () => {
//         const initState = [["", "", ""]];
//         const action: WordActionType = {
//             type: SET_STATE,
//             payload: { wordId: 0, letterId: 0, state: "correct" },
//         };
//         const expectedState = [["correct", "", ""]];
//         const newState = wordReducer(initState, action);
//         expect(newState).toEqual(expectedState);
//     });
// });
// describe("wordReducer", () => {
//     it("should return init state when wordId is out of bounds", () => {
//         const initState = [["", "", ""]];
//         const action: WordActionType = {
//             type: SET_STATE,
//             payload: { wordId: 1, letterId: 2, state: "incorrect" },
//         };
//         const newState = wordReducer(initState, action);
//         expect(newState).toEqual(initState);
//     });
// });
// describe("wordReducer", () => {
//     it("should return init state when letterId is out of bounds", () => {
//         const initState = [["", "", ""]];
//         const action: WordActionType = {
//             type: SET_STATE,
//             payload: { wordId: 0, letterId: 3, state: "incorrect" },
//         };
//         const newState = wordReducer(initState, action);
//         expect(newState).toEqual(initState);
//     });
// });
// describe("wordReducer", () => {
//     it("should return incorrect for whole word when user skips", () => {
//         const initState = [["", "", ""]];
//         const action: WordActionType = {
//             type: SET_INCORRECT_ON_WHOLE_WORD,
//             payload: { wordId: 0 },
//         };
//         const newState = wordReducer(initState, action);
//         const expectedState = [["incorrect", "incorrect", "incorrect"]];
//         expect(newState).toEqual(expectedState);
//     });
// });

export {};
