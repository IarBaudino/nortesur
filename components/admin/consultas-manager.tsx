"use client";

import { useState, useEffect } from "react";
import { collection, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Consulta } from "@/lib/firebase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, Phone, Calendar, Users, MessageCircle, CheckCircle2, Circle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const tipoConsultaMap: Record<string, string> = {
  paquete: "Paquete turístico",
  vuelo: "Vuelos",
  hotel: "Hoteles",
  auto: "Alquiler de autos",
  actividad: "Actividades",
  otro: "Otro",
};

export function ConsultasManager() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Usar onSnapshot para actualización en tiempo real
    const q = query(collection(db, COLLECTIONS.CONSULTAS), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const consultasData: Consulta[] = [];
      querySnapshot.forEach((doc) => {
        consultasData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Consulta);
      });
      setConsultas(consultasData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (id: string, leida: boolean) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.CONSULTAS, id), {
        leida: !leida,
      });
    } catch (error) {
      console.error("Error updating consulta:", error);
      alert("Error al actualizar la consulta");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta consulta?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.CONSULTAS, id));
    } catch (error) {
      console.error("Error deleting consulta:", error);
      alert("Error al eliminar la consulta");
    }
  };

  const openConsulta = (consulta: Consulta) => {
    setSelectedConsulta(consulta);
    setIsDialogOpen(true);
    // Marcar como leída al abrir
    if (!consulta.leida) {
      handleMarkAsRead(consulta.id, false);
    }
  };

  const unreadCount = consultas.filter((c) => !c.leida).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-[#033671] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: "#033671" }}>Cargando consultas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: "#033671" }}>
            Consultas de Clientes
          </h2>
          <p className="text-gray-600 mt-1">
            {consultas.length} consulta{consultas.length !== 1 ? "s" : ""} total
            {unreadCount > 0 && (
              <span className="ml-2">
                • <span className="font-semibold text-[#6D4C05]">{unreadCount} sin leer</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {consultas.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600">No hay consultas aún</p>
            <p className="text-sm text-gray-500 mt-2">
              Las consultas del formulario aparecerán aquí
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {consultas.map((consulta) => (
            <Card
              key={consulta.id}
              className={`cursor-pointer hover:shadow-lg transition-all ${
                !consulta.leida ? "border-l-4 border-l-[#6D4C05] bg-blue-50/30" : ""
              }`}
              onClick={() => openConsulta(consulta)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold" style={{ color: "#033671" }}>
                        {consulta.nombre}
                      </h3>
                      {!consulta.leida && (
                        <Badge className="bg-[#6D4C05] text-white">Nueva</Badge>
                      )}
                      <Badge variant="outline">
                        {tipoConsultaMap[consulta.tipoConsulta] || consulta.tipoConsulta}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{consulta.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{consulta.telefono}</span>
                      </div>
                      {consulta.destino && (
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>{consulta.destino}</span>
                        </div>
                      )}
                      {consulta.fechaViaje && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(consulta.fechaViaje).toLocaleDateString("es-AR")}</span>
                        </div>
                      )}
                      {consulta.ciudadSalida && (
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Salida: {consulta.ciudadSalida}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 line-clamp-2">{consulta.mensaje}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {consulta.createdAt.toLocaleString("es-AR")}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(consulta.id, consulta.leida);
                      }}
                      title={consulta.leida ? "Marcar como no leída" : "Marcar como leída"}
                    >
                      {consulta.leida ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(consulta.id);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog para ver detalles completos */}
      {selectedConsulta && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl" style={{ color: "#033671" }}>
                Consulta de {selectedConsulta.nombre}
              </DialogTitle>
              <DialogDescription>
                  {new Date(selectedConsulta.createdAt).toLocaleString("es-AR")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-base">{selectedConsulta.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Teléfono</label>
                  <p className="text-base">{selectedConsulta.telefono}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Tipo de consulta</label>
                  <p className="text-base">
                    {tipoConsultaMap[selectedConsulta.tipoConsulta] || selectedConsulta.tipoConsulta}
                  </p>
                </div>
                {selectedConsulta.cantidadPersonas && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Personas</label>
                    <p className="text-base">{selectedConsulta.cantidadPersonas}</p>
                  </div>
                )}
              </div>
              {selectedConsulta.destino && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Destino</label>
                  <p className="text-base">{selectedConsulta.destino}</p>
                </div>
              )}
              {selectedConsulta.fechaViaje && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Fecha de viaje</label>
                  <p className="text-base">
                    {new Date(selectedConsulta.fechaViaje).toLocaleDateString("es-AR")}
                  </p>
                </div>
              )}
              {selectedConsulta.ciudadSalida && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Ciudad de salida</label>
                  <p className="text-base">{selectedConsulta.ciudadSalida}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-600">Mensaje</label>
                <p className="text-base whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {selectedConsulta.mensaje}
                </p>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${selectedConsulta.email}`;
                  }}
                  className="flex-1"
                  style={{ backgroundColor: "#033671", color: "#ffffff" }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Responder por Email
                </Button>
                <Button
                  onClick={() => {
                    if (!selectedConsulta.telefono || selectedConsulta.telefono.trim() === "") {
                      alert("Esta consulta no tiene número de teléfono");
                      return;
                    }
                    // Limpiar el número de teléfono (remover espacios, guiones, paréntesis, etc.)
                    const cleanPhone = selectedConsulta.telefono.replace(/[^\d+]/g, "");
                    // Si no empieza con +, agregar código de país de Argentina por defecto
                    const phoneNumber = cleanPhone.startsWith("+") 
                      ? cleanPhone.substring(1) 
                      : cleanPhone.startsWith("54") 
                        ? cleanPhone 
                        : `54${cleanPhone}`;
                    // Crear mensaje para el admin
                    const message = encodeURIComponent(
                      `Hola ${selectedConsulta.nombre}, te contactamos desde Nortesur Travel respecto a tu consulta sobre ${tipoConsultaMap[selectedConsulta.tipoConsulta] || selectedConsulta.tipoConsulta}${selectedConsulta.destino ? ` a ${selectedConsulta.destino}` : ""}.`
                    );
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
                  }}
                  className="flex-1"
                  style={{ backgroundColor: "#25D366", color: "#ffffff" }}
                  disabled={!selectedConsulta.telefono || selectedConsulta.telefono.trim() === ""}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

