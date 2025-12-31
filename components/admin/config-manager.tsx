"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import { useSiteConfig } from "@/lib/hooks/use-site-config";
import { useAbout } from "@/lib/hooks/use-about";

export function ConfigManager() {
  const { config, loading: configLoading } = useSiteConfig();
  const { about, loading: aboutLoading } = useAbout();
  const [saving, setSaving] = useState(false);

  const [aboutData, setAboutData] = useState({
    acercaDeNosotros: "",
    viajesDiseñados: "",
    mision: "",
    vision: "",
    foto: "",
    diploma: "",
  });

  const [heroData, setHeroData] = useState({
    titulo: "",
    subtitulo: "",
    imagenes: [""],
    estadisticas: {
      paises: 0,
      destinos: 0,
      aerolineas: 0,
      atracciones: 0,
    },
  });

  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    address: "",
    whatsapp: {
      phoneNumber: "",
      defaultMessage: "",
    },
    social: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  });

  useEffect(() => {
    if (!aboutLoading && about) {
      setAboutData({
        acercaDeNosotros: about.acercaDeNosotros || "",
        viajesDiseñados: about.viajesDiseñados || "",
        mision: about.mision || "",
        vision: about.vision || "",
        foto: about.foto || "",
        diploma: about.diploma || "",
      });
    }
  }, [about, aboutLoading]);

  useEffect(() => {
    if (!configLoading && config) {
      setHeroData({
        titulo: config.hero?.titulo || "",
        subtitulo: config.hero?.subtitulo || "",
        imagenes: config.hero?.imagenes || [""],
        estadisticas: config.hero?.estadisticas || {
          paises: 50,
          destinos: 200,
          aerolineas: 30,
          atracciones: 500,
        },
      });
      setContactData({
        email: config.contact?.email || "",
        phone: config.contact?.phone || "",
        address: config.contact?.address || "",
        whatsapp: {
          phoneNumber: config.contact?.whatsapp?.phoneNumber || "",
          defaultMessage: config.contact?.whatsapp?.defaultMessage || "",
        },
        social: {
          facebook: config.contact?.social?.facebook || "",
          instagram: config.contact?.social?.instagram || "",
          twitter: config.contact?.social?.twitter || "",
        },
      });
    }
  }, [config, configLoading]);

  const handleSaveAbout = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, COLLECTIONS.ABOUT, "content"), aboutData);
      alert("Información guardada correctamente");
    } catch (error) {
      console.error("Error saving about:", error);
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      const configRef = doc(db, COLLECTIONS.CONFIG, "site");
      const configSnap = await getDoc(configRef);
      const currentData = configSnap.exists() ? configSnap.data() : {};

      await setDoc(configRef, {
        ...currentData,
        hero: heroData,
      });
      alert("Hero guardado correctamente");
    } catch (error) {
      console.error("Error saving hero:", error);
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      const configRef = doc(db, COLLECTIONS.CONFIG, "site");
      const configSnap = await getDoc(configRef);
      const currentData = configSnap.exists() ? configSnap.data() : {};

      await setDoc(configRef, {
        ...currentData,
        contact: contactData,
      });
      alert("Contacto guardado correctamente");
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const addHeroImage = () => {
    setHeroData({ ...heroData, imagenes: [...heroData.imagenes, ""] });
  };

  const removeHeroImage = (index: number) => {
    setHeroData({
      ...heroData,
      imagenes: heroData.imagenes.filter((_, i) => i !== index),
    });
  };

  const updateHeroImage = (index: number, value: string) => {
    const newImagenes = [...heroData.imagenes];
    newImagenes[index] = value;
    setHeroData({ ...heroData, imagenes: newImagenes });
  };

  if (configLoading || aboutLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#033671" }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: "#033671" }}>
        Configuración General
      </h2>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">Sobre Nosotros</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>Sobre Nosotros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Acerca de Nosotros</Label>
                <Textarea
                  value={aboutData.acercaDeNosotros}
                  onChange={(e) => setAboutData({ ...aboutData, acercaDeNosotros: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Texto para la sección 'Acerca de Nosotros'"
                />
              </div>
              <div>
                <Label>Viajes Diseñados a la Medida de Cada Cliente</Label>
                <Textarea
                  value={aboutData.viajesDiseñados}
                  onChange={(e) => setAboutData({ ...aboutData, viajesDiseñados: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Texto para la sección 'Viajes Diseñados a la Medida de Cada Cliente'"
                />
              </div>
              <div>
                <Label>Misión</Label>
                <Textarea
                  value={aboutData.mision}
                  onChange={(e) => setAboutData({ ...aboutData, mision: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Texto para la sección 'Misión'"
                />
              </div>
              <div>
                <Label>Visión</Label>
                <Textarea
                  value={aboutData.vision}
                  onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Texto para la sección 'Visión'"
                />
              </div>
              <div>
                <Label>Foto</Label>
                <ImageUpload
                  value={aboutData.foto}
                  onChange={(url) => setAboutData({ ...aboutData, foto: url })}
                  folder="about"
                  label="Foto"
                />
              </div>
              <div>
                <Label>Diploma</Label>
                <ImageUpload
                  value={aboutData.diploma}
                  onChange={(url) => setAboutData({ ...aboutData, diploma: url })}
                  folder="about"
                  label="Diploma"
                />
              </div>
              <Button
                onClick={handleSaveAbout}
                disabled={saving}
                style={{ backgroundColor: "#033671", color: "#ffffff" }}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={heroData.titulo}
                  onChange={(e) => setHeroData({ ...heroData, titulo: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={heroData.subtitulo}
                  onChange={(e) => setHeroData({ ...heroData, subtitulo: e.target.value })}
                />
              </div>
              <div>
                <Label>Imágenes del Hero</Label>
                {heroData.imagenes.map((imagen, index) => (
                  <div key={index} className="mb-4 space-y-2">
                    <ImageUpload
                      value={imagen}
                      onChange={(url) => updateHeroImage(index, url)}
                      folder="hero"
                      label={`Imagen ${index + 1}`}
                    />
                    {heroData.imagenes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeHeroImage(index)}
                        className="w-full"
                      >
                        Eliminar Imagen
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addHeroImage}
                  className="mt-2"
                >
                  Agregar Imagen
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <Label className="text-lg font-semibold mb-4 block" style={{ color: "#033671" }}>
                  Estadísticas
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cantidad de Países</Label>
                    <Input
                      type="number"
                      value={heroData.estadisticas.paises}
                      onChange={(e) =>
                        setHeroData({
                          ...heroData,
                          estadisticas: {
                            ...heroData.estadisticas,
                            paises: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      min="0"
                    />
                  </div>
                  <div>
                    <Label>Cantidad de Destinos</Label>
                    <Input
                      type="number"
                      value={heroData.estadisticas.destinos}
                      onChange={(e) =>
                        setHeroData({
                          ...heroData,
                          estadisticas: {
                            ...heroData.estadisticas,
                            destinos: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      min="0"
                    />
                  </div>
                  <div>
                    <Label>Cantidad de Aerolíneas</Label>
                    <Input
                      type="number"
                      value={heroData.estadisticas.aerolineas}
                      onChange={(e) =>
                        setHeroData({
                          ...heroData,
                          estadisticas: {
                            ...heroData.estadisticas,
                            aerolineas: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      min="0"
                    />
                  </div>
                  <div>
                    <Label>Cantidad de Atracciones</Label>
                    <Input
                      type="number"
                      value={heroData.estadisticas.atracciones}
                      onChange={(e) =>
                        setHeroData({
                          ...heroData,
                          estadisticas: {
                            ...heroData.estadisticas,
                            atracciones: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleSaveHero}
                disabled={saving}
                style={{ backgroundColor: "#033671", color: "#ffffff" }}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#033671" }}>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Dirección</Label>
                <Input
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                />
              </div>
              <div>
                <Label>WhatsApp - Número</Label>
                <Input
                  value={contactData.whatsapp.phoneNumber}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      whatsapp: { ...contactData.whatsapp, phoneNumber: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>WhatsApp - Mensaje por Defecto</Label>
                <Textarea
                  value={contactData.whatsapp.defaultMessage}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      whatsapp: { ...contactData.whatsapp, defaultMessage: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Facebook URL</Label>
                <Input
                  value={contactData.social.facebook}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      social: { ...contactData.social, facebook: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Instagram URL</Label>
                <Input
                  value={contactData.social.instagram}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      social: { ...contactData.social, instagram: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Twitter URL</Label>
                <Input
                  value={contactData.social.twitter}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      social: { ...contactData.social, twitter: e.target.value },
                    })
                  }
                />
              </div>
              <Button
                onClick={handleSaveContact}
                disabled={saving}
                style={{ backgroundColor: "#033671", color: "#ffffff" }}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}




