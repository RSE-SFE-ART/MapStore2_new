/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from "react";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import localizedProps from "../../../../misc/enhancers/localizedProps";
import {
    htmlToDraftJSEditorState,
    draftJSEditorStateToHtml
} from "../../../../../utils/EditorUtils";

import withDebounceOnCallback from "../../../../misc/enhancers/withDebounceOnCallback";
import CompactRichTextEditor from "../../../../mapviews/settings/CompactRichTextEditor";

const TitleInput = localizedProps("placeholder")(FormControl);
const DescriptorEditor = withDebounceOnCallback(
    "onEditorStateChange",
    "editorState"
)(CompactRichTextEditor);

function TextOptions({ data = {}, onChange = () => {}, isLoggedIn = false }) {
    const [mode, setMode] = useState('rich');
    const [editorState, setEditorState] = useState(
        htmlToDraftJSEditorState(data.text || "")
    );
    const [rawText, setRawText] = useState(data.text || "");

    useEffect(() => {
        setRawText(data.text || "");
        if (mode === 'rich') {
            setEditorState(htmlToDraftJSEditorState(data.text || ""));
        }
    }, [data.text, mode]);

    useEffect(() => {
        // If user logs out while in raw mode, switch back to rich mode
        if (!isLoggedIn && mode === 'raw') {
            setMode('rich');
        }
    }, [isLoggedIn, mode]);

    return (
        <div>
            <Col key="form" xs={12}>
                <Form>
                    <FormGroup controlId="title">
                        <Col sm={12}>
                            <TitleInput
                                style={{ marginBottom: 10 }}
                                placeholder="widgets.builder.wizard.titlePlaceholder"
                                value={data.title}
                                type="text"
                                onChange={(e) =>
                                    onChange("title", e.target.value)
                                }
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="textMode">
                        <Col sm={12}>
                            <div style={{ marginBottom: 10 }}>
                                <Button
                                    bsStyle={mode === 'rich' ? 'primary' : 'default'}
                                    onClick={() => setMode('rich')}
                                    style={{ marginRight: 5 }}
                                >
                                    Rich text
                                </Button>
                                {isLoggedIn && (
                                    <Button
                                        bsStyle={mode === 'raw' ? 'primary' : 'default'}
                                        onClick={() => setMode('raw')}
                                    >
                                        Raw HTML
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
            {mode === 'rich' ? (
                <DescriptorEditor
                    uploadEnabled
                    editorState={editorState}
                    onEditorStateChange={(newEditorState) => {
                        const previousHTML = draftJSEditorStateToHtml(editorState);
                        const newHTML = draftJSEditorStateToHtml(newEditorState);
                        if (newHTML !== previousHTML) {
                            onChange(
                                "text",
                                draftJSEditorStateToHtml(newEditorState)
                            );
                            setEditorState(newEditorState);
                        }
                    }}
                    // Array of custom or built in fonts can be set via props
                    // fonts={["Arial", "Impact", "Roman"]}
                />
            ) : (
                <FormGroup controlId="rawHtml">
                    <Col sm={12}>
                        <FormControl
                            componentClass="textarea"
                            style={{ minHeight: 300, fontFamily: 'monospace' }}
                            value={rawText}
                            onChange={(e) => {
                                setRawText(e.target.value);
                                onChange("text", e.target.value);
                            }}
                        />
                    </Col>
                </FormGroup>
            )}
        </div>
    );
}
export default TextOptions;
