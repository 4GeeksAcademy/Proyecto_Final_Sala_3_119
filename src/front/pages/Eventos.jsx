import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {sportImages}  from "../jsApiComponents/sportsImages"
import { toast } from "react-toastify";
export const Eventos = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fallbackEvents = [
    {
      id: 1,
      title: "Yoga Matutino",
      description: "Sesión de yoga matutina.",
      sport: "Yoga",
      image:
        "https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=1/tour_img/724c514c8455afc2a374acfef42807e12740f867305e87421a07c24d39d14a23.jpeg",
      participants: [],
      max_participants: 10,
    },
    {
      id: 2,
      title: "Carrera Nocturna",
      description: "Carrera grupal en parque.",
      sport: "Running",
      image:
        "https://www.aytolalaguna.es/actualidad/noticias/.galleries/IMAGENES-Noticias/2025/01/CARRERA-NOCTURNA-2024.jpeg",
      participants: [],
      max_participants: 20,
    },
    {
      id: 3,
      title: "Pilates",
      description: "Relaja y fortalece tu cuerpo.",
      sport: "Pilates",
      image:
        "https://assets.dmagstatic.com/wp-content/uploads/2019/08/tight10of19-677x451.jpg",
      participants: [],
      max_participants: 25,
    },
    {
      id: 4,
      title: "Spinning Intensivo",
      description: "Entrenamiento intenso en bicicleta.",
      sport: "Spinning",
      image: "https://blogscdn.thehut.net/wp-content/uploads/sites/450/2016/08/09041209/beneficios-spinning-1.jpg",
      participants: [],
      max_participants: 10,
    },
    {
      id: 5,
      title: "Meditación Guiada",
      description: "Sesión de meditación guiada para relajarte.",
      sport: "Meditación",
      image: "https://www.elpradopsicologos.es/storage/posts/June2021/group-of-young-sporty-people-sitting-in-padmasana-pose.jpg",
      participants: [],
      max_participants: 20,
    },
    {
      id: 6,
      title: "Entrenamiento Funcional",
      description: "Mejora fuerza y movilidad con ejercicios funcionales.",
      sport: "Funcional",
      image: "https://akroscenter.com/wp-content/uploads/2023/05/Entrenamiento-funcional-Descubre-sus-beneficios.jpg",
      participants: [],
      max_participants: 10,
    },
    {
      id: 7,
      title: "Caminata Saludable",
      description: "Caminata grupal al aire libre para mantenerse activo.",
      sport: "Caminata", image: "https://estaticosgn-cdn.deia.eus/clip/604fa017-9146-4961-b436-f7bb5a2ff949_16-9-discover-aspect-ratio_default_0.jpg",
      participants: [],
      max_participants: 10,
    },
    {
      id: 8,
      title: "Natación para Todos",
      description: "Sesión de natación para todos los niveles.",
      sport: "Natación",
      image: "https://noticiasncc.com/wp-content/uploads/2024/01/183-6-CIENCIA_Natacio%CC%81n-nin%CC%83os_.jpg",
      participants: [],
      max_participants: 35,
    },
    {
    id: 9,
    title: "Ciclismo Urbano",
    description: "Ruta en bicicleta por la ciudad.",
    sport: "Ciclismo",
    image: "https://www.olimpiadatododia.com.br/wp-content/uploads/2025/08/Ciclismo-urbano-como-usar-a-bike-para-melhorar-a-qualidade-de-vida-na-cidade.jpg.webp",
    participants: [],
    max_participants: 15,
  },
  {
    id: 10,
    title: "Partido de Baloncesto",
    description: "Encuentro amistoso de baloncesto en cancha local.",
    sport: "Baloncesto",
    image: "https://us.images.westend61.de/0001875758pw/one-vs-one-basketball-game-training-at-the-court-cinematic-look-image-of-friends-practicing-shots-and-slam-dunks-in-an-urban-area-DMDF01780.jpg",
    participants: [],
    max_participants: 12,
  },
  {
    id: 11,
    title: "Paddle en Pareja",
    description: "Partido de paddle para principiantes y avanzados.",
    sport: "Paddle",
    image: "https://images.ecestaticos.com/pbtjE56n3h2SB1o63JnIuzHYm1M=/196x3:1706x1132/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fac5%2Fd74%2Fdde%2Fac5d74dde3758fcb79032f5f92b83b12.jpg",
    participants: [],
    max_participants: 8,
  },
  {
    id: 12,
    title: "Torneo de Tenis",
    description: "Competición de tenis amateur para todas las edades.",
    sport: "Tenis",
    image: "https://duyn491kcolsw.cloudfront.net/files/0z/0zl/0zlzu1.jpg?ph=94811ccd17",
    participants: [],
    max_participants: 16,
  },
  {
    id: 13,
    title: "Fútbol 5",
    description: "Partido de fútbol 5 al aire libre.",
    sport: "Fútbol",
    image: "https://t4.ftcdn.net/jpg/00/94/59/47/360_F_94594712_1Cfz6lO9whnqj82Zu82r2notTj6BeyrV.jpg",
    participants: [],
    max_participants: 10,
  },
  {
    id: 14,
    title: "Voleibol Playa",
    description: "Juego de voleibol en la playa para principiantes.",
    sport: "Voleibol",
    image: "https://dotorg.brightspotcdn.com/dims4/default/6b3ef88/2147483647/strip/true/crop/3000x2000+0+0/resize/800x533!/quality/90/?url=http%3A%2F%2Fsoi-brightspot.s3.amazonaws.com%2Fdotorg%2F3a%2F80%2Fc263d7cb4e4b9ee2f20a6249c7f8%2Fie-sovoleywc-051025-01801.jpg",
    participants: [],
    max_participants: 12,
  },
  {
    id: 15,
    title: "Entrenamiento de Boxeo",
    description: "Sesión de boxeo para principiantes y avanzados.",
    sport: "Boxeo",
    image: "https://contents.mediadecathlon.com/p2755312/k$dfcde12bc151d44143611e16661cca43/1920x0/3644pt2431/7288xcr4861/mezczyzna-w-rekawicach-uderzajacy-w-gruszke-bokserska.jpg?format=auto",
    participants: [],
    max_participants: 12,
  },
  {
    id: 16,
    title: "Escalada Indoor",
    description: "Aprende técnicas básicas de escalada en muro indoor.",
    sport: "Escalada",
    image: "https://static.wixstatic.com/media/3dc9d0_24b7046f6fa24ba2b511e37a643dca61~mv2.jpg/v1/fill/w_6240,h_4160,al_c/3dc9d0_24b7046f6fa24ba2b511e37a643dca61~mv2.jpg",
    participants: [],
    max_participants: 10,
  },
  {
    id: 17,
    title: "Surf en Playa",
    description: "Clases de surf para todos los niveles.",
    sport: "Surf",
    image: "https://res.cloudinary.com/simpleview/image/upload/v1706044013/clients/panama/El_Palmar_San_Carlos_Panam_Oeste_Province_Panam_2__638b50c8-bd5f-49c8-a345-7c8cb2c082f4.jpg",
    participants: [],
    max_participants: 8,
  },
  {
    id: 18,
    title: "Curso de Esgrima",
    description: "Aprende esgrima y técnicas de combate con espada.",
    sport: "Esgrima",
    image: "https://esgrimaenvalencia.es/wp-content/uploads/2019/08/entrenamiento-de-esgrima-valencia-1024x517.jpg",
    participants: [],
    max_participants: 10,
  },
  {
    id: 19,
    title: "Kayak en Río",
    description: "Excursión grupal en kayak por río local.",
    sport: "Kayak",
    image: "https://paddlingmag.com/wp-content/uploads/2024/10/touring-kayaks-2-stellar-s14-g2-kaydi-pyette.jpg?wsr",
    participants: [],
    max_participants: 6,
  },
  {
    id: 20,
    title: "Skateboard Park",
    description: "Practica trucos y técnicas de skateboard en parque.",
    sport: "Skateboard",
    image: "https://cam-skate.co.uk/values/img/southbank.jpg",
    participants: [],
    max_participants: 10,
  },
  {
    id: 21,
    title: "Torneo de Ping Pong",
    description: "Competición amistosa de ping pong para todos.",
    sport: "Ping Pong",
    image: "https://www.fairplayce.pl/wp-content/uploads/2016/01/tenis-stolowy-2@2x.jpg",
    participants: [],
    max_participants: 8,
  },
  {
    id: 22,
    title: "Clínica de Golf",
    description: "Aprende técnicas básicas y juega en grupo.",
    sport: "Golf",
    image: "https://www.minutegolf.ca/images/Depositphotos_friends_playing_golfjpgcrdownload.jpg",
    participants: [],
    max_participants: 6,
  },
{
    id: 23,
    title: "Muay Thai",
    description: "Entrenamiento grupal de Muay Thai para todos los niveles. Aprende técnicas de golpeo, patadas y defensa mientras mejoras tu condición física. Ideal para quienes buscan un deporte intenso y divertido en equipo. ¡No se requiere experiencia previa!",
    sport: "Artes Marciales",
    image: "https://teamm1.com/wp-content/uploads/kickboxing-gym-11-1080x658.jpg",
    participants: [],
    max_participants: 12,
  },
  {
  id: 24,
  title: "Ruta en Patinete",
  description: "Paseo grupal en patinete eléctrico por la ciudad. Ideal para divertirse y mantenerse activo al aire libre.",
  sport: "Patinete",
  image: "https://e-katalog.pl/posts/files/4876/wide_pic.jpg",
  participants: [],
  max_participants: 10,
}

  ];

  const fetchEvents = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/api/activities`);
      if (!resp.ok) throw new Error("Error fetching");
      const data = await resp.json();
      setEvents(data);
    } catch (err) {
      setEvents([]); // fallback si falla
    }
  };

  useEffect(() => {
    fetchEvents();
    window.addEventListener("activities-updated", fetchEvents);
    return () => window.removeEventListener("activities-updated", fetchEvents);
  }, []);

  const list = events.length > 0 ? events : fallbackEvents;

  const sportsUnique = Array.from(new Set(list.map((e) => e.sport)));

  const filteredList = list.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.sport.toLowerCase().includes(search.toLowerCase());

    const matchesSport = sportFilter === "" || event.sport === sportFilter;

    return matchesSearch && matchesSport;
  });




  const getSportImage = (sport) => {
    return sportImages[sport] ?? "https://via.placeholder.com/400";
  }


  const joinEvent = async (event) => {
    if (event.participants.length >= event.max_participants) {
      toast.error("Este evento ya está lleno.");;
      return;
    }

    try {
      const token = localStorage.getItem("JWT-STORAGE-KEY");
      const resp = await fetch(`${BASE_URL}/api/activities/${event.id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "No se pudo unir al evento");
      }

      toast.success(`Te has unido a: ${event.title}`);

      fetchEvents();
    } catch (err) {
      toast.error(err.message);

    }
  };






  
  return (
    <>
      <div className="container mt-5">
        <div className="row g-3 justify-content-center">

          <div className="col-12 col-md-6">
            <input
              className="mf-neon-input form-control w-100"
              placeholder="Buscar evento o deporte..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-6">
            <select
              className="mf-neon-input form-select w-100"
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
            >
              <option value="">Todos los deportes</option>
              {sportsUnique.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row g-4 justify-content-center">
          {filteredList.map((event) => (
            <div
              key={event.id}
              className="col-12 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center"
            >
              <Card
                className="w-100"
                style={{
                  boxShadow: "0px 0px 5px 2px #817DF9",
                  borderRadius: "12px",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <CardMedia
                  component="img"
                  height="175"
                  image={event.image || getSportImage(event.sport)}
                  alt={event.title}
                />


                <CardContent className="text-center">
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#20232D", fontWeight: 700 }}
                  >
                    {event.sport}
                  </Typography>

                  <Button
                    size="small"
                    className="mf-neon-btn-small mf-neon-btn-orange"
                    title="Unirse al evento"
                    onClick={() => joinEvent(event)}
                    disabled={(event.participants?.length ?? 0) >= event.max_participants}
                    sx={{
                      minWidth: "70px",
                      minHeight: "40px",
                      fontSize: "1.2rem",
                      marginRight: "10px",
                    }}
                  >
                    +
                  </Button>

                  <Button
                    size="small"
                    className="mf-neon-btn-small mf-neon-btn-purple"
                    title="Ver detalles del evento o calificar"
                    onClick={() => navigate(`/events/${event.id}`)}
                    sx={{
                      minWidth: "70px",
                      minHeight: "40px",
                      fontSize: "1.2rem",
                    }}
                  >
                    🔍
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{ color: "#000000ff", fontSize: "0.75rem" }}
                  >
                    <hr></hr>
                    <h6>{event.title}</h6>
                    {event.description}
                    <br />
                    <strong>
                      Participantes:{" "}
                      {(event.participants?.length ?? 0)}/
                      {event.max_participants}
                    </strong>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
