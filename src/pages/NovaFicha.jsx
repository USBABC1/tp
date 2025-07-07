@@ .. @@
 import React, { useState } from "react";
-import { Paciente } from "../entities/Paciente";
-import { Consulta } from "../entities/Consulta";
+import { Paciente } from "../entities/Paciente.js";
+import { Consulta } from "../entities/Consulta.js";
 import { useNavigate } from "react-router-dom";
-import { createPageUrl } from "../lib/utils";
+import { createPageUrl } from "../lib/utils.js";
 import { Save, FileText, User, Heart, Stethoscope, Smile, Activity, Baby, SmilePlus, Apple, Edit3 } from "lucide-react";
 
-import CampoSimNao from "../components/CampoSimNao";
-import MapaDental from "../components/MapaDental";
-import HistoricoConsultas from "../components/HistoricoConsultas";
+import CampoSimNao from "../components/CampoSimNao.jsx";
+import MapaDental from "../components/MapaDental.jsx";
+import HistoricoConsultas from "../components/HistoricoConsultas.jsx";