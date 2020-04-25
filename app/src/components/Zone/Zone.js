import React, { useState } from 'react';

import './Zone.css';

const Zone = () => {

    function displayFields(id){

        document.getElementById("cmbRegionID").options[document.getElementById("td_RegionID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML].selected=true;

        document.getElementById("txtZoneID").value = document.getElementById("td_ZoneID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtZoneName").value = document.getElementById("td_ZoneName" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;			
        document.getElementById("txtZoneAbbr").value = document.getElementById("td_ZoneAbbr" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;

    }

    const [name, setName] = useState("Default Name");

    return (

        <section class="forms">
        <div class="container-fluid">
          <header> 
            <h1 class="h3 display">Add / Edit Zone            </h1>
          </header>
          <div class="row">
            <div class="col-lg-6">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                  <h4>Form</h4>
                </div>
                <div class="card-body">
                  <p></p>
                  <form class="form-horizontal">
					<div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Region ID</label>
                      </div>
                      <div class="col-sm-10">
                        <select id="cmbRegionID" data-style="btn-primary" class="form-control form-control-warning">
                          <option id="NRT_0001">North Region</option>
                          <option id="STH_0002">South Region</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Zone ID</label>
                      </div>
                      <div class="col-sm-10">
                        <input disabled="true" id="txtZoneID" type="Zone ID" placeholder="Zone ID" class="form-control form-control-warning"/>
                      </div>
                    </div>
					
                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Zone Name</label>
                      </div>
                      <div class="col-sm-10">
                        <input id="txtZoneName" type="Zone Name" placeholder="Zone Name" class="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Zone Abbreviation</label>
                      </div>
                      <div class="col-sm-10">
                        <input id="txtZoneAbbr" type="Zone Abbreviation" placeholder="Zone Abbreviation" class="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div class="form-group row">       
                      <div class="col-sm-10 offset-sm-2">
                        <input type="button" value="Add" class="btn btn-primary"/>
						<input type="button" value="Edit" class="btn btn-primary"/>
						<input type="button" value="Save" class="btn btn-primary"/>
						<input type="button" value="Delete" class="btn btn-primary"/>
                      </div>
                    </div>
                  </form>                
				</div>
              </div>
            </div>
			<div class="col-lg-6">
              <div class="card">
                <div class="card-header d-flex align-items-center">
                  <h4>Grid</h4>
                </div>
                <div class="card-body">
                    <table id="datatable1" style={{width: "100%"}} class="table">
                      <thead>
                        <tr>
                          <th class="hidden">ID</th>						  
                          <th>ID</th>
                          <th>Name</th>
						  <th class="hidden">Abbreviation</th>

                        </tr>
                      </thead>
                      <tbody>
					    <tr id="tr_0001" onClick={() => displayFields("tr_0001")}>
							  <td class="hidden" id="td_RegionID_0001">NRT_0001</td>
							  <td id="td_ZoneID_0001">NRT_FSB_0001</td>
							  <td id="td_ZoneName_0001">Faisalabad</td>						
							  <td class="hidden" id="td_ZoneAbbr_0001">FSB</td>
                        </tr>

					    <tr id="tr_0002" onClick={() => displayFields("tr_0002")}>
							  <td class="hidden" id="td_RegionID_0002">NRT_0001</td>
							  <td id="td_ZoneID_0002">NRT_LHR_0002</td>
							  <td id="td_ZoneName_0002">Lahore</td>						
							  <td class="hidden" id="td_ZoneAbbr_0002">LHR</td>
                        </tr>
                         
                        <tr id="tr_0003" onClick={() => displayFields("tr_0003")}>
							  <td class="hidden" id="td_RegionID_0003">NRT_0001</td>
							  <td id="td_ZoneID_0003">NRT_ISB_0003</td>
							  <td id="td_ZoneName_0003">Islamabad</td>						
							  <td class="hidden" id="td_ZoneAbbr_0003">ISB</td>
                        </tr>
					  
					    <tr id="tr_0004" onClick={() => displayFields("tr_0004")}>
							  <td class="hidden" id="td_RegionID_0004">NRT_0001</td>
							  <td id="td_ZoneID_0004">NRT_PSH_0004</td>
							  <td id="td_ZoneName_0004">Peshawar</td>						
							  <td class="hidden" id="td_ZoneAbbr_0004">PSH</td>
                        </tr>

                        <tr id="tr_0005" onClick={() => displayFields("tr_0005")}>
							  <td class="hidden" id="td_RegionID_0005">STH_0002</td>
							  <td id="td_ZoneID_0005">STH_MUL_0005</td>
							  <td id="td_ZoneName_0005">Multan</td>
							  <td class="hidden" id="td_ZoneAbbr_0005">MUL</td>
                        </tr>

                        <tr id="tr_0006" onClick={() => displayFields("tr_0006")}>
							  <td class="hidden" id="td_RegionID_0006">STH_0002</td>
							  <td id="td_ZoneID_0006">STH_SUK_0006</td>
							  <td id="td_ZoneName_0006">Sukkur</td>						
							  <td class="hidden" id="td_ZoneAbbr_0006">SUK</td>
                        </tr>
                        <tr id="tr_0007" onClick={() => displayFields("tr_0007")}>
							  <td class="hidden" id="td_RegionID_0007">STH_0002</td>
							  <td id="td_ZoneID_0007">STH_HYD_0007</td>
							  <td id="td_ZoneName_0007">Hyderabad</td>						
							  <td class="hidden" id="td_ZoneAbbr_0007">HYD</td>
                        </tr>
                        <tr id="tr_0008" onClick={() => displayFields("tr_0008")}>
							  <td class="hidden" id="td_RegionID_0008">STH_0002</td>
							  <td id="td_ZoneID_0008">STH_KHI_0008</td>
							  <td id="td_ZoneName_0008">Karachi</td>						
							  <td class="hidden" id="td_ZoneAbbr_0008">KHI</td>
                        </tr>
                        <tr id="tr_0009" onClick={() => displayFields("tr_0009")}>
							  <td class="hidden" id="td_RegionID_0009">STH_0002</td>
							  <td id="td_ZoneID_0009">STH_QTA_0009</td>
							  <td id="td_ZoneName_0009">Quetta</td>						
							  <td class="hidden" id="td_ZoneAbbr_0009">QTA</td>
                        </tr>
                        
                      </tbody>
                    </table>
                </div>
              </div>
            </div>                    
          </div>
        </div>
      </section>

    )
}

export default Zone;
