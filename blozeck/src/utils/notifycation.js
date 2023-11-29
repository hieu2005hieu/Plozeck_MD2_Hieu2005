import { notification } from "antd";
const successNoti = (type) => {
    notification.success({
        message: type,
        duration: 1,
        style: {
            top: 100,
        },
    });
}
const errorNoti = (type) => {
    notification.error({
        message: type,
        duration: 1,
        style: {
            top: 100,
        },
    });
}
export { successNoti, errorNoti }