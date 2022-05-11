import { GetDislikeRequest, GetdislikeResponse, getDislikeApi } from "../api/getDislikeApi";
import dislike from "../dislike";

async function getDislike(id) {
    try {
        const dislikeData = await getDislikeApi(
            new GetDislikeRequest({ id })
        );

        return new dislike(dislikeData);
    } catch (error) {
        throw error
    }
}

export {
    getDislike,
}