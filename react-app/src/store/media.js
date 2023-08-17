// Constants
export const SET_ALL_MEDIA = "media/SET_ALL_MEDIA";
export const ADD_MEDIA = "media/ADD_MEDIA";
export const DELETE_MEDIA = "media/DELETE_MEDIA";

// Action Creators
export const setAllMediaAction = (mediaList) => ({
    type: SET_ALL_MEDIA,
    payload: mediaList
});

export const addMediaAction = (media) => ({
    type: ADD_MEDIA,
    payload: media
});

export const deleteMediaAction = (mediaId) => ({
    type: DELETE_MEDIA,
    payload: mediaId
});

// Thunks
export const thunkGetAllMediaByProductId = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/medias/${productId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch media.");
        }
        console.log("Fetched Media:", data);
        dispatch(setAllMediaAction(data));
    } catch (error) {
        console.error(error);
    }
};

export const thunkAddMediaToProduct = (productId, mediaFile) => async (dispatch) => {
    const formData = new FormData();
    formData.append('media_file', mediaFile);

    try {
        const response = await fetch(`/api/medias/${productId}`, {
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
        case SET_ALL_MEDIA:
            return {
                ...state,
                ...action.payload.reduce((acc, media) => {
                    acc[media.id] = media;
                    return acc;
                }, {})
            };
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
