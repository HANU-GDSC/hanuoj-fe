import { GetLikeRequest, GetLikeResponse, getLikeApi } from "../api/getLikeApi";
import Like from "../like";

async function getLike(id) {
    try {
        const likeData = await getLikeApi(
            new GetLikeRequest({ id })
        );

        return new Like(likeData);
    } catch (error) {
        throw error
    }
}

export {
    getLike,
}