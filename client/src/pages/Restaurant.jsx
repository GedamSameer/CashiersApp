import { useEffect } from "react"
import useRestaurantStore from "../zustand-stores/restaurantStore"

const Restaurant = () => {
    const resturantsList = useRestaurantStore(state => state.restaurants)
    const getAllRestaurants = useRestaurantStore(state => state.getAllRestaurants)
    useEffect(() => {
        getAllRestaurants()
    },[])
    return(
        <>
        <button>Add Restaurant</button>
        <table>
            <thead>
                <th></th>
            </thead>
            <tbody>
                {resturantsList.map((r) =>)}
            </tbody>
        </table>

        </>
    )
}
export default Restaurant