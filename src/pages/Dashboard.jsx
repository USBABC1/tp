@@ .. @@
 import React, { useState, useEffect } from "react";
-import { Paciente } from "../entities/Paciente";
+import { Paciente } from "../entities/Paciente.js";
 import { Link } from "react-router-dom";
-import { createPageUrl } from "../lib/utils";
+import { createPageUrl } from "../lib/utils.js";
 import { Plus, Search, FileText, Calendar, User, Phone } from "lucide-react";