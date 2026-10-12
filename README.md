# 🛰️ RescueSat AI

> **“When Earth Goes Silent, Space Speaks.”**

RescueSat AI is an intelligent space-enabled disaster-monitoring and emergency decision-support platform. Designed for incident commanders, urban search and rescue (USAR) teams, and humanitarian coordinators operating in the critical 72-hour window after catastrophic earthquakes, floods, cyclones, and landslides.

---

## 🌟 Key Modules & Capabilities

### 1. 🏠 Mission Landing Page
- **Tagline & Visual HUD**: *"When Disaster Strikes, See Beyond the Damage."*
- Interactive scenario selector for multi-region operations.
- Live satellite mesh status and constellation pass overview.

### 2. 📊 Emergency Operations Dashboard (EOC)
- **Real-Time KPIs**: Total active incidents, critical life-hazard count, estimated casualties/displaced populations, severed arterial roadways, and isolated hamlets.
- **Interactive Visualizations**: Recharts priority distribution pie charts and category breakdown charts.
- **Live Telemetry Stream**: Real-time incident feed and animated rotating radar HUD.

### 3. 🗺️ Tactical Satellite GIS Map
- **Leaflet & Esri Integration**: Toggle between High-Resolution Satellite Imagery, Tactical Dark Mode, and OpenStreetMap.
- **Glowing Pulse Markers**: Color-coded markers (🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low) with custom icons for Collapsed Structures, Severed Bridges, Blocked Roads, Operational Hospitals, and Shelters.
- **Dynamic Inspection Drawer**: Click any marker to view coordinates, estimated casualties, AI confidence, full priority formula breakdown, and dispatch rescue teams.

### 4. 🔍 AI Satellite Damage Analysis Studio
- **Scenario Presets**: High-resolution imagery for Eastern Mediterranean Earthquake, Valencia Flash Floods, Wayanad Landslides, and Cyclone Mocha.
- **Custom Image Upload**: Drag-and-drop satellite GeoTIFF, PNG, or aerial photos.
- **Computer Vision Visualizer**: Laser beam scanning animation, damage segmentation heatmaps, and bounding box detections with confidence ratings.
- **Automated Incident Drafting**: Convert AI findings directly into active operations incidents.

### 5. 🌐 Isolated Communities & Connectivity Engine
- **Topological Route Analysis**: Identify severed bridges, rockfalls, and submerged ravines.
- **Cut-Off Settlements Ranking**: Track days isolated, population count, nearest hospital distance, and supplies runway.
- **Air-Drop Logistics Dispatcher**: Trigger aerial supply requests with flight-deck coordination.

### 6. 🛡️ Rescue Operations & Transparent Priority Engine
- **Incident Table**: Search, multi-criteria filtering, sorting, inline field verification, and team assignments.
- **Transparent Mathematical Scoring Engine**:
  $$\text{PriorityScore} = \min\left(100, \max\left(0, (w_{\text{pop}} \cdot \text{Pop} + w_{\text{dmg}} \cdot \text{Damage} + w_{\text{iso}} \cdot \text{Isolation} + w_{\text{vuln}} \cdot \text{Vuln}) \cdot \text{TimeDecay}\right)\right)$$
- **Interactive Calculator**: Adjust population, damage severity, accessibility, and vulnerable demographics to inspect real-time scores and rationale bullet points.
- **Team Dispatch Center**: Assign specialized heavy USAR, Swiftwater, Medevac, and K9 units.

### 7. 📄 Emergency Situation Reports (SitRep) & Live Alerts
- **Printable SitRep Generator**: Automatically formats UN OCHA compliant situation reports for printing or PDF export.
- **Data Export**: Instant CSV and GeoJSON downloads.
- **Real-Time Alert Feed**: Audio/visual emergency alert ticker.
- **Satellite Fleet Telemetry**: Tracks Sentinel-2B, Landsat-9, TerraSAR-X, WorldView-3, and PlanetScope passes.

### 8. ℹ️ Project Architecture & Ethics Framework
- Detailed microservice pipeline documentation and transparent AI decision-support disclaimers.

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Running Locally

```bash
# 1. Clone or navigate to the repository directory
cd "RescueSat AI"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

### Production Build

```bash
npm run build
```

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS (Dark Space-Tech HUD Theme)
- **GIS Mapping**: Leaflet & React-Leaflet with Esri World Imagery & CartoDB Dark Matter
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas-Confetti

---

## ⚖️ Decision-Support Prototype Notice
RescueSat AI is designed as a disaster-response decision-support prototype. In demonstration mode, simulated satellite observations and computer vision detections are clearly distinguished from verified field ground truth. Field commanders must always confirm automated predictions with tactical reconnaissance.
