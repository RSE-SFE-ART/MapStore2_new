/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import I18N from '../../../../components/I18N/I18N';


class About extends React.Component {
    render() {
        return (
            <div className="about-content-section">
                <h1 style={{marginTop: 0}}>Geoportale RSE</h1>

                <p>
                    <strong><I18N.Message msgId="about_p0-0"/></strong><br></br>
                    <I18N.Message msgId="about_p0-1"/>
                </p>
                <p>
                    <strong><I18N.Message msgId="about_p1-0"/></strong><br></br>
                    <I18N.HTML msgId="about_p1-1"/>
                    <I18N.Message msgId="about_p1-2"/>
                </p>
                <p>
                    <strong><I18N.Message msgId="about_p2-0"/></strong><br></br>
                    <I18N.HTML msgId="about_p2-1"/>
                </p>
                <p><em>
                    <I18N.Message msgId="about_cite0"/><br></br>
                    <I18N.HTML msgId="about_cite1"/><br></br>
                    <I18N.HTML msgId="about_cite2"/>
                </em></p>

                <p style={{fontSize: "0.85em"}}>
                    <I18N.Message msgId="about_bottom1"/><br/><br/>
                    <I18N.Message msgId="about_bottom2"/>
                </p>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}>
                    <img
                        src="product/assets/img/rds-logo.png"
                        alt="RSE Ricerca di Sistema"
                        style={{ maxHeight: "100px" }}
                    />

                    <I18N.HTML msgId="about_image2" />
                </div>

            </div>);
    }
}

export default About;
