import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import markerIcon from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';

function MapGenerator(props){

    {/* Install Leaflet to use Openstreetmap: https://www.youtube.com/watch?v=i9oX1upSKjI */}
    {/* Openstreetmap Tutorial: https://www.youtube.com/watch?v=290VgjkLong */}
    {/* MUST ADD STYLE ATTRIBUTE TO MapContainer: https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed */}
    {/* Adding Markers: https://stackoverflow.com/questions/71229824/displaying-array-of-data-with-lat-long-as-markers-react-leaflet 
        Making Markers Display: https://stackoverflow.com/questions/60174040/marker-icon-isnt-showing-in-leaflet */}
      
  
    {/* Centering Map (Tuhame's Answer): https://stackoverflow.com/questions/13034188/how-to-center-align-google-maps-in-a-div-with-a-variable-width */}
  
    return( //1082 by 1082
      <MapContainer center={[props.latitude, props.longitude]} zoom = {20} style={{ height: "500px", width: "500px"}}>
        <Marker 
          position={[props.latitude, props.longitude]}
          icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
              {props.hotel}
            </Popup>
        </Marker>
        <TileLayer
          url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap </a>contributors'
        />
      </MapContainer>
    )
  }

  export default MapGenerator
