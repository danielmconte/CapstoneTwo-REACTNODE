import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Card, CardBody } from "reactstrap";
import GridSkeleton from "./GridSkeleton";
import './DimensionsForm.css'

const DimensionsForm = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(
        (state) => ({
            token: state.token,
        }),
        shallowEqual
    );
    const { isAdmin } = useSelector(
        (state) => ({
            isAdmin: state.isAdmin,
        }),
        shallowEqual
    );
    const { height, width } = useSelector((state) => ({
        height: state.height,
        width: state.width,
    }), shallowEqual);
    const { confirming } = useSelector((state) => ({
        confirming: state.confirming,
    }));
    const [inputs, setInputs] = useState({ height, width });
    const [confirm, setConfirm] = useState({ confirming });

    const handleInputChange = (evt) => {
        const { value, name } = evt.target;
        setInputs((inputs) => ({ ...inputs, [name]: +value }));
    };


    const handleSubmit = (evt) => {
        evt.preventDefault();
        let curHeight = inputs.height;
        let curWidth = inputs.width;

        dispatch({
            type: "CHANGE_DIMENSIONS",
            curHeight,
            curWidth,
        });

        setConfirm(true);
        dispatch({ type: "CONFIRMED" });
    };

    const resetTable = () => {
        dispatch({
            type: "RESET_ALL",
            payload: { token: token, isAdmin: isAdmin },
        });
        setConfirm({ confirming });
    };

    const confirmation = () => {
        setConfirm(true);
        dispatch({ type: "CONFIRMED" });
      
    };
    console.log(confirm.confirming);
    return (
        <>
            {confirming ? (
                <div>
                    <h4>Dimensions Confirmed</h4>
                    <h4>
                        Please setup your walls(remember to leave a possible
                        path)
                    </h4>
                </div>
            ) : (
                <div className="container">
                    <h3>Enter your grid size, please:</h3>
                    <Card id="CardBg" color="light">
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="height">
                                        Height:
                                        <input
                                            id="height"
                                            name="height"
                                            type="number"
                                            min="5"
                                            max="25"
                                            value={inputs.height}
                                            onChange={handleInputChange}
                                        />
                                    </Label>
                                    <Label htmlFor="width" className="mx-2">
                                        Width:
                                        <input
                                            id="width"
                                            name="width"
                                            type="number"
                                            min="5"
                                            max="25"
                                            value={inputs.width}
                                            onChange={handleInputChange}
                                        />
                                    </Label>
                                    <Button
                                        className="mx-auto mt-2 d-block"
                                        color="dark"
                                    >
                                        Confirm
                                    </Button>{" "}
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            )}

            <GridSkeleton
                inputHeight={inputs.height}
                inputWidth={inputs.width}
                confirmed={confirm}
                confirmation={confirmation}
                resetTable={resetTable}
            />
        </>
    );
};

export default DimensionsForm;
