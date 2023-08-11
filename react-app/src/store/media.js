// Constants
export const ADD_MEDIA = "media/ADD_MEDIA";
export const DELETE_MEDIA = "media/DELETE_MEDIA";

// Action Creators
export const addMediaAction = (media) => ({
    type: ADD_MEDIA,
    payload: media
});

export const deleteMediaAction = (mediaId) => ({
    type: DELETE_MEDIA,
    payload: mediaId
});


export const thunkAddMediaToPost = (ownerId, mediaFile) => async (dispatch) => {
    const formData = new FormData();
    formData.append('media_file', mediaFile);

    try {
        const response = await fetch(`/api/medias/${ownerId}`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add media.");
        }

        dispatch(addMediaAction(data.Media));
    } catch (error) {
        console.error(error);
    }
};

export const thunkDeleteMedia = (mediaId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/medias/${mediaId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Failed to add media.");
        }

        dispatch(deleteMediaAction(mediaId));
    } catch (error) {
        console.error(error);
    }
};

const initialState = {};

export default function mediaReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MEDIA:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_MEDIA:
            if (!state[action.payload]) {
                return state;
            }
            const { [action.payload]: deletedMedia, ...remainingMedia } = state;
            return remainingMedia;
        default:
            return state;
    }
};

// const initialState = [];

// export default function mediaReducer(state = initialState, action) {
//     switch (action.type) {
//         case ADD_MEDIA:
//             return [...state, action.payload];

//         case DELETE_MEDIA:
//             return state.filter(media => media.id !== action.payload);

//         default:
//             return state;
//     }
// };
