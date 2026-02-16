import {
  Button,
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useColorMode,
  Stack,
  Divider,
  ButtonGroup,
  Image,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./index.css";
import { Link, NavLink } from "react-router-dom";
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,capital,region",
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  }, []);

  function regionSelect(evt) {
    const region = evt.target.value;

    if (region === "all") {
      fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,region",
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setData(res);
        });
    } else {
      fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setData(res);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }

  if (loader) {
    return (
      <div className="qwert">
        <div className="loader"></div>
      </div>
    );
  }

  function dataGet(evt) {
    console.log(evt.target);
  }

  return (
    <div>
      <header className="shadow-2xl shadow-slate-200">
        <nav className="flex p-0 pt-[24px] pb-[24px]  m-0 mr-auto ml-auto max-w-[1280px] items-center justify-between">
          <h2 className="title">Where in the world?</h2>
          <Box>
            <Button onClick={toggleColorMode}>{colorMode} Mode</Button>
          </Box>
        </nav>
      </header>

      <section className="m-0 mr-auto ml-auto max-w-[1280px] pt-[20px]">
        <p className="font-normal text-[12px]">Filter by Region</p>
        <Select onChange={regionSelect}>
          <option value="all">All</option>
          <option value="Europe">Yevropa</option>
          <option value="Africa">Afrika</option>
          <option value="Americas">Ameraika</option>
          <option value="Oceania">Okeaniya</option>
          <option value="Asia">Osiyo</option>
        </Select>
      </section>

      <section className="flex m-0  pt-[50px] mr-auto ml-auto max-w-[1280px] justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((element) => {
            // console.log(element.name.common);
            return (
              <Card maxW="sm" key={element.name.common}>
                <CardBody>
                  <Image
                    src={element.flags.svg}
                    alt={element.flags.alt}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{element.name.common}</Heading>
                    <Text>
                      <span className="font-semibold">Region: </span>
                      {element.region}
                    </Text>
                    <Text>
                      <span className="font-semibold">Population: </span>
                      {element.population}
                    </Text>
                    <Text>
                      <span className="font-semibold">Capital: </span>
                      {element.capital}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <CardFooter>
                    <NavLink
                      onClick={dataGet}
                      to={"/info/" + element.name.common}>
                      More info
                    </NavLink>
                  </CardFooter>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
