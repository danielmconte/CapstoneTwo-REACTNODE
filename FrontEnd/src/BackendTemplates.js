import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Button } from "reactstrap";
import TemplateApi from "./Api";
import "./BackendTemplates.css";

const BackEndTemplates = ({ tempMaker }) => {
    const [template, setTemplate] = useState(null);
    const [refreshTemplate, setRefreshTemplate] = useState(null)
    const [message, setMessage] = useState(null);

    const { wallBlocks } = useSelector(
        (state) => ({
            wallBlocks: state.wallBlocks,
        }),
        shallowEqual
    );
    const { height, width } = useSelector(
        (state) => ({
            height: state.height,
            width: state.width,
        }),
        shallowEqual
    );
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


    useEffect(() => {
        async function getTemplates() {
            let templates = await TemplateApi.getTemplates();
            setTemplate(templates);
        }
        getTemplates();
    }, [refreshTemplate]);

    const addTemplate = (evt) => {
        evt.preventDefault();
        setRefreshTemplate(`Refresh ${evt.target.id}`)
        let stringy = wallBlocks.join();
        async function postTemplate() {
            let result = await TemplateApi.newTemplate(token, stringy, height, width);
            setMessage(result);
        }
        postTemplate();
    };

    const deleteTemplate = (evt) => {
        let btnID = evt.target.id
        evt.preventDefault();
        setRefreshTemplate(`Refresh ${evt.target.id}`)
        async function ridOfTemplate(btnID, token) {
            await TemplateApi.deleteTemplate(btnID, token);
        }
        ridOfTemplate(btnID, token);

    }

    return (
        <div>
            {template && isAdmin ? (
                <div className="templates">
                    {/* To view return */}
                    {/* <h3>{JSON.stringify(Object.values(template))}</h3> */}
                    {Object.values(template).map((i) => (
                        <div>
                            <Button
                                id={i.id}
                                className="btn btn-danger btn-sm"
                                onClick={deleteTemplate}
                            >
                                X
                            </Button>
                            <Button
                                className="my-2 mx-2 btn btn-sm"
                                color="secondary"
                                id={i.id}
                                onClick={() =>
                                    tempMaker(i.height, i.width, i.wall)
                                }
                            >{`Template ${i.id}`}</Button>
                        </div>
                    ))}
                </div>
            ) : null}

            {template && !isAdmin ? (
                <div className="templates">
                    {/* To view return */}
                    {/* <h3>{JSON.stringify(Object.values(template))}</h3> */}
                    {Object.values(template).map((i) => (
                        <Button
                            className="my-2 mx-2 btn btn-sm"
                            color="secondary"
                            id={i.id}
                            onClick={() => tempMaker(i.height, i.width, i.wall)}
                        >{`Template ${i.id}`}</Button>
                    ))}
                </div>
            ) : null}
            {token ? (
                <form onSubmit={addTemplate}>
                    <button>SAVE TEMPLATE</button>
                </form>
            ) : null}


            {message ? (
                <div>
                    <h6>{JSON.stringify(message.data.message)}</h6>
                </div>
            ) : (
                null
            )}
        </div>
    );
};

export default BackEndTemplates;
