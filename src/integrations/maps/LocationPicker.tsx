import { useState, useCallback, useRef } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY } from '@/constants'

interface Location {
  lat: number
  lng: number
  address?: string
}

interface LocationPickerProps {
  value?: Location
  onChange: (location: Location) => void
}

const defaultCenter = { lat: 41.2995, lng: 69.2401 } // Toshkent

const mapContainerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '12px',
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [marker, setMarker] = useState<Location>(value || defaultCenter)
  const mapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      const newLocation = { lat, lng }
      setMarker(newLocation)
      onChange(newLocation)

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: newLocation }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          onChange({ ...newLocation, address: results[0].formatted_address })
        }
      })
    },
    [onChange]
  )

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const location = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      setMarker(location)
      onChange(location)
      mapRef.current?.panTo(location)
      mapRef.current?.setZoom(15)

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          onChange({ ...location, address: results[0].formatted_address })
        }
      })
    })
  }

  if (loadError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
        Xarita yuklanmadi. Google Maps API kalitini tekshiring.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-[350px] animate-pulse rounded-xl bg-gray-200" />
    )
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={useCurrentLocation}
        className="flex items-center gap-2 rounded-lg border border-primary-300 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
      >
        <span>📍</span>
        Joriy joylashuvimni ishlatish
      </button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={marker}
        zoom={13}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={marker} />
      </GoogleMap>
      <p className="text-xs text-gray-500">
        Xaritada joylashuvingizni tanlash uchun bosing yoki "Joriy joylashuv" tugmasidan foydalaning
      </p>
    </div>
  )
}
