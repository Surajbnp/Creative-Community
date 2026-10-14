"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as CLink,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaApple, FaGoogle, FaLinkedin } from "react-icons/fa";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import PhoneFrame from "@/components/onboarding/PhoneFrame";
import Logo from "@/components/ui/Logo";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { hydrated, onboarded, user, login } = useApp();

  const [mode, setMode] = useState("login"); // login | signup
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!onboarded) router.replace("/onboarding");
    else if (user) router.replace("/");
  }, [hydrated, onboarded, user, router]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (mode === "signup" && !form.name.trim()) er.name = "Tell us your name";
    if (!form.email.trim()) er.email = "Email or username is required";
    else if (form.email.includes("@") && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email";
    if (form.password.length < 6) er.password = "Use at least 6 characters";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const enter = (patch) => {
    setLoading(true);
    // fake latency — replace with your real auth call later
    setTimeout(() => {
      login(patch);
      router.replace("/");
    }, 500);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    enter(mode === "signup" && form.name.trim() ? { name: form.name.trim() } : {});
  };

  const social = (name) => {
    toast({ title: `Continuing with ${name}`, status: "info", duration: 1200 });
    enter({});
  };

  return (
    <PhoneFrame>
      {/* decorative leaves */}
      <Box position="absolute" top="-30px" right="-30px" boxSize="150px" rounded="70% 0 70% 0" bg="app.brand" opacity={0.1} transform="rotate(25deg)" />
      <Box position="absolute" bottom="-40px" left="-40px" boxSize="170px" rounded="70% 0 70% 0" bg="app.accent" opacity={0.14} transform="rotate(-20deg)" />

      <Flex direction="column" h="full" px={7} py={8} overflowY="auto" position="relative" className="hide-scroll">
        <Flex justify="center" mt={2}>
          <Logo size={40} />
        </Flex>

        <Box textAlign="center" mt={7}>
          <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize="30px">
            {mode === "login" ? "Welcome Back" : "Join Zura"}
          </Heading>
          <Text mt={2} fontSize="sm" color="app.muted" maxW="260px" mx="auto">
            {mode === "login"
              ? "Login to your account and continue your creative journey."
              : "Create an account and start collaborating with creators."}
          </Text>
        </Box>

        {/* tabs */}
        <HStack mt={6} spacing={0} borderBottom="1px solid" borderColor="app.border">
          {[
            ["login", "Login"],
            ["signup", "Sign Up"],
          ].map(([v, l]) => (
            <Box
              key={v}
              as="button"
              type="button"
              flex="1"
              pb={3}
              fontSize="sm"
              fontWeight={mode === v ? 700 : 500}
              color={mode === v ? "app.text" : "app.muted"}
              borderBottom="2px solid"
              borderColor={mode === v ? "app.brand" : "transparent"}
              mb="-1px"
              onClick={() => {
                setMode(v);
                setErrors({});
              }}
            >
              {l}
            </Box>
          ))}
        </HStack>

        <VStack mt={5} spacing={3}>
          <Button w="full" h="46px" variant="outlineApp" bg="app.card" leftIcon={<FaGoogle />} onClick={() => social("Google")} isDisabled={loading}>
            Continue with Google
          </Button>
          <Button w="full" h="46px" variant="outlineApp" bg="app.card" leftIcon={<FaLinkedin />} onClick={() => social("Apple")} isDisabled={loading}>
            Continue with LinkedIn
          </Button>
        </VStack>

        <Flex align="center" gap={3} my={5} color="app.muted" fontSize="xs">
          <Divider />
          or
          <Divider />
        </Flex>

        <VStack as="form" onSubmit={submit} spacing={3} noValidate>
          {mode === "signup" && (
            <FormControl isInvalid={!!errors.name}>
              <InputGroup>
                <InputLeftElement h="48px" color="app.muted">
                  <FiUser />
                </InputLeftElement>
                <Input h="48px" placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
              </InputGroup>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
          )}
          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement h="48px" color="app.muted">
                <FiMail />
              </InputLeftElement>
              <Input h="48px" placeholder="Email or Username" value={form.email} onChange={set("email")} autoComplete="username" />
            </InputGroup>
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup>
              <InputLeftElement h="48px" color="app.muted">
                <FiLock />
              </InputLeftElement>
              <Input
                h="48px"
                type={show ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={set("password")}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
              <InputRightElement h="48px">
                <IconButton
                  aria-label={show ? "Hide password" : "Show password"}
                  icon={show ? <FiEyeOff /> : <FiEye />}
                  size="sm"
                  variant="ghostApp"
                  onClick={() => setShow((s) => !s)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          {mode === "login" && (
            <Flex w="full" justify="flex-end">
              <CLink
                fontSize="xs"
                color="app.muted"
                onClick={() => toast({ title: "Password reset coming soon", status: "info", duration: 1800 })}
              >
                Forgot Password?
              </CLink>
            </Flex>
          )}

          <Button type="submit" w="full" h="50px" mt={2} rightIcon={<FiArrowRight />} isLoading={loading}>
            {mode === "login" ? "Login" : "Create account"}
          </Button>
        </VStack>
      </Flex>
    </PhoneFrame>
  );
}
