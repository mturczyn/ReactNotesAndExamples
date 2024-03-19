import { Map, View } from 'ol'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import { useEffect } from 'react'
import 'ol/ol.css' // Import OpenLayers CSS

export default function Maps() {
    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })
        const map = new Map({
            // The ID of the element that will contain the map.
            target: 'map-container',
            layers: [osmLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        })
        return () => map.setTarget(null)
    }, [])

    return (
        <>
            <h1>Maps</h1>
            <div
                id="map-container"
                style={{
                    width: '100%',
                    height: '500px',
                    border: '1px solid black',
                    margin: '1ch',
                }}
            ></div>
        </>
    )
}
