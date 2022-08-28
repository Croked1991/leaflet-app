import "leaflet/dist/leaflet.css";
import "@react-leaflet/core"
import { useAppSelector } from "../../hooks/useAppSelector";
import { center } from "../../constantes/constantes";
import { ClearMap } from "./clearMap/ClearMap";
import { MapWithRoute } from "./mapWithRoute/MapWithRoute";




export const Map = () => {

    const route = useAppSelector(store => store.route.route)
    
    
    return (
        route.length 
        ? 
        <MapWithRoute
            center={center} 
            route={route}
        /> 
        : 
        <ClearMap 
            center={center}
        />
    )
    
};
