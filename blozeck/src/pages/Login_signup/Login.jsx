import { useNavigate } from "react-router-dom";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Signup_Login.scss";
import img from "../../../public/img/logo_login.jpg";
import apis from "../../service/api.user";
import { errorNoti, successNoti } from "../../utils/notifycation";
import { useState } from "react";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignIn() {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleGetUser = () => {
    fetch("http://localhost:8000/User")
      .then((res) => res.json())
      .then((user) => {
        setUser([...user]);
      });
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  const handlCLicka = () => {
    navigate("/Singup");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginUser = {
      email: data.get("email"),
      password: data.get("password"),
      status: data.get("status"),
    };
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    apis.checkLogin(loginUser.email, loginUser.password).then((response) => {
      if (!data.get("email") || !data.get("password")) {
        errorNoti("Không Được Để Trống");
        return;
      }
      if (!regexEmail.test(loginUser.email)) {
        errorNoti("Email Không Đúng Định Dạng");
        return;
      }
      if (!regexPass.test(loginUser.password)) {
        errorNoti("Mật Khẩu : Kí tự đầu viết hoa có cả số");
        return;
      }
      if (response.data.length != 0) {
        if (response.data[0].status == false) {
          errorNoti("Tài Khoản Của Bạn Đã Bị Ban");
          return;
        }
        if (response.data[0].role == "admin") {
          localStorage.setItem("userLogin", JSON.stringify(response.data[0]));
          successNoti("Đăng Nhập Thành Công");
          navigate("/AdminProduct");
          return;
        }
        successNoti("Đăng Nhập Thành Công");
        localStorage.setItem("userLogin", JSON.stringify(response.data[0]));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errorNoti("Không Đúng Mật Khẩu Hoặc Email ");
      }
    });
  };

  return (
    <>
      <div className="test">
        <div className="test_ter">
          <div>
            <img src={img} alt="" />
          </div>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Đăng nhập
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật Khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đăng Nhập
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <div>Quên Mật Khẩu</div>
                    </Grid>
                    <Grid item>
                      <div onClick={handlCLicka} className="click">
                        Chưa có tai khoản ? Đăng Kí
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
