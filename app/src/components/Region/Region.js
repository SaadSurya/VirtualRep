import React, { useState } from 'react';

import './Region.css';

const Region = () => {

    function displayFields(id){

        document.getElementById("txtRegionID").value = document.getElementById("td_RegionID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtRegionName").value = document.getElementById("td_RegionName" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;			
        document.getElementById("txtRegionAbbr").value = document.getElementById("td_RegionAbbr" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;

    }
const [name, setName] = useState("Default Name");

    return (

        <section class="forms">	  
        <div class="container-fluid">
          <header> 
            <h1 class="h3 display">Add / Edit Region            </h1>
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
                        <input disabled="true" id="txtRegionID" type="Region ID" placeholder="Region ID" class="form-control form-control-warning"/>
                      </div>
                    </div>
					
                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Region Name</label>
                      </div>
                      <div class="col-sm-10">
                        <input id="txtRegionName" type="Region Name" placeholder="Region Name" class="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Region Abbreviation</label>
                      </div>
                      <div class="col-sm-10">
                        <input id="txtRegionAbbr" type="Region Abbreviation" placeholder="Region Abbreviation" class="form-control form-control-warning"/>
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
                          <th>ID</th>
                          <th>Name</th>
						              <th class="hidden">Abbreviation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr  id="tr_0001" onClick={() => displayFields("tr_0001")}>
                          <td id="td_RegionID_0001">NRT_0001</td>
                          <td id="td_RegionName_0001">North Region</td>						
                          <td class="hidden" id="td_RegionAbbr_0001">NORTH</td>
                        </tr>
                        <tr  id="tr_0001" onClick={() => displayFields("tr_0002")}>
                          <td id="td_RegionID_0002">STH_0002</td>
                          <td id="td_RegionName_0002">South Region</td>						
                          <td class="hidden" id="td_RegionAbbr_0002">SOUTH</td>
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

export default Region;
