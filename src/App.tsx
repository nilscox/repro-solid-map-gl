import { Link, Route, Router, Routes } from "@solidjs/router";
import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from "@tanstack/solid-query";
import * as maplibre from "maplibre-gl";
import { Show, Suspense } from "solid-js";
import MapGL, { Layer, Source } from "solid-map-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const client = new QueryClient();

export function App() {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={client}>
        <Router>
          <Link href="/">root</Link> - <Link href="/map">map</Link>
          <Routes>
            <Route path="/" component={RootPage} />
            <Route path="/map" component={MapPage} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Suspense>
  );
}

function RootPage() {
  return <div>Root</div>;
}

function MapPage() {
  const query = createQuery(() => ({
    queryKey: [Math.random()],
    queryFn: () => [2.35, 48.85],
  }));

  return (
    <Show when={query.data}>
      {(center) => (
        <MapGL
          debug
          mapLib={maplibre}
          style={{ width: "600px", height: "400px" }}
          viewport={{ center: center(), zoom: 10 }}
        >
          <Source
            source={{
              type: "raster",
              tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap Contributors",
            }}
          >
            <Layer style={{ type: "raster" }} />
          </Source>
        </MapGL>
      )}
    </Show>
  );
}
