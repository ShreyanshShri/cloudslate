import { entity_data } from "./fileTypes";

// server action types (what server route to be called)
export enum action_types {
    AddEntity,
    UpdateEntity,
    DeleteEntity,
    ChangeOrder
}


export type history_el = {
    action_type: action_types,
    entity?: entity_data,
    index?: number,
}

