import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
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

import "../index.css";
import { div } from "framer-motion/client";
export default function Info() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { name } = useParams();
  const [nameData, setNameData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setNameData(res[0]);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  if (loader) {
    return (
      <div className="qwert">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <header className="shadow-2xs p-3  shadow-slate-200">
        <nav className="flex p-0 pt-[24px] pb-[24px]  m-0 mr-auto ml-auto max-w-[1280px] items-center justify-between">
          <h2 className="title">Where in the world?</h2>
          <Box>
            <Button onClick={toggleColorMode}>{colorMode} Mode</Button>
          </Box>
        </nav>
      </header>

      <div className="m-0 pt-[30px] p-3 mr-auto ml-auto max-w-[1280px]">
        <NavLink to="/">
          <ButtonGroup className="pb-3">
            <Button>Back to Home</Button>
          </ButtonGroup>
        </NavLink>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col xl:flex-row  gap-4 items-center justify-center">
            <Image
              height={400}
              src={nameData.flags?.svg}
              alt={nameData.flags?.alt}
              borderRadius="lg"
            />
            <Card className="w-full">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="xl">{nameData.name?.common}</Heading>
                  <div className="flex p-3 gap-5 justify-between">
                    <div className="">
                      <Text>
                        <span className="font-semibold">Native Name: </span>
                        {nameData.name?.nativeName?.ita?.official}
                      </Text>
                      <Text>
                        <span className="font-semibold">Population: </span>
                        {nameData.population}
                      </Text>
                      <Text>
                        <span className="font-semibold">Region: </span>
                        {nameData.region}
                      </Text>
                      <Text>
                        <span className="font-semibold">Sub Region: </span>
                        {nameData.subregion}
                      </Text>
                      <Text>
                        <span className="font-semibold">Capital: </span>
                        {nameData.capital}
                      </Text>
                    </div>
                    <div>
                      <Text>
                        <span className="font-semibold">
                          Top Level Domain:{" "}
                        </span>
                        {nameData.tld}
                      </Text>
                      <Text>
                        <span className="font-semibold">Timezones: </span>
                        {nameData.timezones}
                      </Text>
                      <Text>
                        <span className="font-semibold">Car Sign: </span>
                        {nameData.car?.signs}
                      </Text>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-[24px]">
                      Border Countries:
                    </span>
                    {nameData.borders}
                  </div>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
