import {InputType} from "../../types/common";

export const inputs = [
    {
        id:'username',
        name:'username',
        type:InputType.TEXT,
        placeholder:'Your username',
        label:'Username'
    },
    {
        label:'Password',
        id:'password',
        name:'password',
        type:InputType.PASSWORD,
        placeholder:'Your password',
    }
]