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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { notification } from "antd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { errorNoti, successNoti } from "../../utils/notifycation";
import img from "../../../public/img/logo_login.jpg";
import apis from "../../service/api.user";
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
export default function Singup() {
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    password: "",
    email: "",
    password_cofirm: "",
  });
  const [check1, setCheck1] = useState(false);
  const handlOnchange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handlCLicka = () => {
    navigate("/Login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (
      !newUser.name ||
      !newUser.password ||
      !newUser.email ||
      !newUser.password_cofirm
    ) {
      errorNoti("Không Được Để Trống");
      return;
    }
    if (newUser.name.length < 6) {
      errorNoti("Tên đủ 6 kí tự");
      return;
    }
    if (!regexEmail.test(newUser.email)) {
      errorNoti("Chưa đúng định dạng email");
      return;
    }
    if (!regexPass.test(newUser.password)) {
      errorNoti("Mật Khẩu : Kí tự đầu viết hoa có cả số");
      return;
    }

    apis.checkEmail(newUser.email).then((res) => {
      if (res.data.length != 0) {
        errorNoti("Email Đã Tồn Tại");
        return;
      }
      if (newUser.password !== newUser.password_cofirm) {
        errorNoti("Mật Khẩu Không Khớp");
        return;
      }
      if (!check1) {
        errorNoti("Vui Lòng Xác Nhận");
        return;
      }
      delete newUser.password_cofirm;
      apis.register({
        ...newUser,
        id: uuidv4(),
        avatar: "",
        cart: [],
        status: true,
        role:"user"
      });
      successNoti("Thành Công");
      setNewUser({
        id: "",
        name: "",
        password: "",
        email: "",
        password_cofirm: "",
        avatar: "",
      });
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    });
  };

  return (
    <>
      <div className="test">
        <div className="test_ter">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" className="test2">
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
                  Đăng kí
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        name="name"
                        id="firstName"
                        label="Tên Người Dùng"
                        value={newUser.name}
                        onChange={handlOnchange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={newUser.email}
                        onChange={handlOnchange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="Mật Khẩu"
                        label="Mật Khẩu"
                        name="password"
                        type="password"
                        value={newUser.password}
                        onChange={handlOnchange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password_cofirm"
                        label="Nhập Lại Mật Khẩu"
                        type="password"
                        id="password"
                        onChange={handlOnchange}
                        value={newUser.password_cofirm}
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        required
                        control={
                          <Checkbox
                            value="allowExtraEmails"
                            color="primary"
                            onClick={(e) => setCheck1(e.target.checked)}
                          />
                        }
                        label="I want to receive inspiration,updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đăng kí
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <div onClick={handlCLicka} className="click">
                        Quay Lại ? Đăng nhập
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          <div>
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
