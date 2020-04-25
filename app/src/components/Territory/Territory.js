import React, { useState } from 'react';

import './Territory.css';

const Territory = () => {

    function displayFields(id){

		document.getElementById("cmbRegionID").options[document.getElementById("td_RegionID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML].selected=true;
		document.getElementById("cmbZoneID").options[document.getElementById("td_ZoneID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML].selected=true;

		document.getElementById("txtTerritoryID").value = document.getElementById("td_TerritoryID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
		document.getElementById("txtTerritoryName").value = document.getElementById("td_TerritoryName" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;			
		document.getElementById("txtTerritoryAbbr").value = document.getElementById("td_TerritoryAbbr" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;

    }

    return (

        <section>
        <div class="container-fluid">
          <header> 
            <h1 class="h3 display">Add / Edit Territory            </h1>
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
                        <select id="cmbZoneID" data-style="btn-primary" class="form-control form-control-warning">
                          <option id="NRT_FSB_0001">Faisalabad</option>
                          <option id="NRT_LHR_0002">Lahore</option>
                          <option id="NRT_ISB_0003">Islamabad</option>
						  <option id="NRT_PSH_0004">Peshawar</option>
						  <option id="STH_MUL_0005">Multan</option>
						  <option id="STH_SUK_0006">Sukkur</option>
						  <option id="STH_HYD_0007">Hyderabad</option>
						  <option id="STH_KHI_0008">Karachi</option>
                        </select>
                      </div>
                    </div>
				  
                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Territory ID</label>
                      </div>
                      <div class="col-sm-10">
                        <input disabled="true" id="txtTerritoryID" type="Territory ID" placeholder="Territory ID" class="form-control form-control-warning"/>
                      </div>
                    </div>
					
                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Territory Name</label>
                      </div>
                      <div class="col-sm-10">
                        <input id="txtTerritoryName" type="Territory Name" placeholder="Territory Name" class="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-2"> 
                        <label>Territory Abbreviation</label>
                      </div>
                      <div class="col-sm-10">
                        <input id="txtTerritoryAbbr" type="Territory Abbreviation" placeholder="Territory Abbreviation" class="form-control form-control-warning"/>
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
						<table id="datatable1" style={{width: "100%;"}} class="table">
						  <thead>
							<tr>
							  <th class="hidden">Region</th>
							  <th class="hidden">Zone</th>						  
							  <th>ID</th>
							  <th>Name</th>
							  <th class="hidden">Abbreviation</th>
							</tr>
						  </thead>
						  <tbody>
							<tr id="tr_0001" onClick={() => displayFields("tr_0001")}>
								  <td class="hidden" id="td_RegionID_0001">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0001">NRT_FSB_0001</td>
								  <td id="td_TerritoryID_0001">NRT_FSB_FB1_0001</td>							  
								  <td id="td_TerritoryName_0001">Faisalabad 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0001">FB1</td>
							</tr>
							<tr id="tr_0002" onClick={() => displayFields("tr_0002")}>
								  <td class="hidden" id="td_RegionID_0002">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0002">NRT_FSB_0001</td>
								  <td id="td_TerritoryID_0002">NRT_FSB_FB2_0002</td>							  
								  <td id="td_TerritoryName_0002">Faisalabad 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0002">FB2</td>
							</tr>
							<tr id="tr_0003" onClick={() => displayFields("tr_0003")}>
								  <td class="hidden" id="td_RegionID_0003">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0003">NRT_FSB_0001</td>
								  <td id="td_TerritoryID_0003">NRT_FSB_FB3_0003</td>							  
								  <td id="td_TerritoryName_0003">Faisalabad 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0003">FB3</td>
							</tr>
							<tr id="tr_0004" onClick={() => displayFields("tr_0004")}>
								  <td class="hidden" id="td_RegionID_0004">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0004">NRT_FSB_0001</td>
								  <td id="td_TerritoryID_0004">NRT_FSB_FB4_0004</td>							  
								  <td id="td_TerritoryName_0004">Faisalabad 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0004">FB4</td>
							</tr>
							<tr id="tr_0005" onClick={() => displayFields("tr_0005")}>
								  <td class="hidden" id="td_RegionID_0005">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0005">NRT_FSB_0001</td>
								  <td id="td_TerritoryID_0005">NRT_FSB_FB5_0005</td>							  
								  <td id="td_TerritoryName_0005">Faisalabad 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0005">FB5</td>
							</tr>
							<tr id="tr_0006" onClick={() => displayFields("tr_0006")}>
								  <td class="hidden" id="td_RegionID_0006">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0006">NRT_FSB_0001</td>
								  <td id="td_TerritoryID_0006">NRT_FSB_FB6_0006</td>							  
								  <td id="td_TerritoryName_0006">Faisalabad 6</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0006">FB6</td>
							</tr>
							
							<tr id="tr_0007" onClick={() => displayFields("tr_0007")}>
								  <td class="hidden" id="td_RegionID_0007">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0007">NRT_LHR_0002</td>
								  <td id="td_TerritoryID_0007">SLB_LHR_LH1_0007</td>							  
								  <td id="td_TerritoryName_0007">Lahore 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0007">LH1</td>
							</tr>
							<tr id="tr_0008"onClick={() => displayFields("tr_0008")}>
								  <td class="hidden" id="td_RegionID_0008">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0008">NRT_LHR_0002</td>
								  <td id="td_TerritoryID_0008">SLB_LHR_LH2_0008</td>							  
								  <td id="td_TerritoryName_0008">Lahore 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0008">LH2</td>
							</tr>
							<tr id="tr_0009" onClick={() => displayFields("tr_0009")}>
								  <td class="hidden" id="td_RegionID_0009">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0009">NRT_LHR_0002</td>
								  <td id="td_TerritoryID_0009">SLB_LHR_LH3_0009</td>							  
								  <td id="td_TerritoryName_0009">Lahore 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0009">LH3</td>
							</tr>
							<tr id="tr_0010" onClick={() => displayFields("tr_0010")}>
								  <td class="hidden" id="td_RegionID_0010">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0010">NRT_LHR_0002</td>
								  <td id="td_TerritoryID_0010">SLB_LHR_LH4_0010</td>							  
								  <td id="td_TerritoryName_0010">Lahore 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0010">LH4</td>
							</tr>
							<tr id="tr_0011"onClick={() => displayFields("tr_0011")}>
								  <td class="hidden" id="td_RegionID_0011">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0011">NRT_LHR_0002</td>
								  <td id="td_TerritoryID_0011">SLB_LHR_LH5_0011</td>							  
								  <td id="td_TerritoryName_0011">Lahore 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0011">LH5</td>
							</tr>

							<tr id="tr_0012"onClick={() => displayFields("tr_0012")}>
								  <td class="hidden" id="td_RegionID_0012">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0012">NRT_ISB_0003</td>
								  <td id="td_TerritoryID_0012">NRT_ISB_IB1_0012</td>							  
								  <td id="td_TerritoryName_0012">Islamabad 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0012">IB1</td>
							</tr>
							<tr id="tr_0013"onClick={() => displayFields("tr_0013")}>
								  <td class="hidden" id="td_RegionID_0013">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0013">NRT_ISB_0003</td>
								  <td id="td_TerritoryID_0013">NRT_ISB_IB1_0013</td>							  
								  <td id="td_TerritoryName_0013">Islamabad 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0013">IB2</td>
							</tr>
							<tr id="tr_0014"onClick={() => displayFields("tr_0014")}>
								  <td class="hidden" id="td_RegionID_0014">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0014">NRT_ISB_0003</td>
								  <td id="td_TerritoryID_0014">NRT_ISB_IB1_0014</td>							  
								  <td id="td_TerritoryName_0014">Islamabad 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0014">IB3</td>
							</tr>
							<tr id="tr_0015" onClick={() => displayFields("tr_0015")}>
								  <td class="hidden" id="td_RegionID_0015">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0015">NRT_ISB_0003</td>
								  <td id="td_TerritoryID_0015">NRT_ISB_IB1_0015</td>							  
								  <td id="td_TerritoryName_0015">Islamabad 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0015">IB4</td>
							</tr>
							<tr id="tr_0016"  onClick={() => displayFields("tr_0016")}>
								  <td class="hidden" id="td_RegionID_0016">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0016">NRT_ISB_0003</td>
								  <td id="td_TerritoryID_0016">NRT_ISB_IB1_0016</td>							  
								  <td id="td_TerritoryName_0016">Islamabad 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0016">IB5</td>
							</tr>
							<tr id="tr_0017"  onClick={() => displayFields("tr_0017")}>								  
                                  <td class="hidden" id="td_RegionID_0017">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0017">NRT_PSH_0004</td>
								  <td id="td_TerritoryID_0017">NRT_PSH_PH1_0017</td>							  
								  <td id="td_TerritoryName_0017">Peshawar 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0017">PH1</td>
							</tr>
							<tr id="tr_0018"  onClick={() => displayFields("tr_0018")}>
								  <td class="hidden" id="td_RegionID_0018">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0018">NRT_PSH_0004</td>
								  <td id="td_TerritoryID_0018">NRT_PSH_PH2_0018</td>							  
								  <td id="td_TerritoryName_0018">Peshawar 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0018">PH2</td>
							</tr>
							
							<tr id="tr_0019"  onClick={() => displayFields("tr_0019")}>
								  <td class="hidden" id="td_RegionID_0019">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0019">NRT_PSH_0004</td>
								  <td id="td_TerritoryID_0019">NRT_PSH_PH3_0019</td>							  
								  <td id="td_TerritoryName_0019">Peshawar 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0019">PH3</td>
							</tr>
							<tr id="tr_0020"  onClick={() => displayFields("tr_0020")}>
								  <td class="hidden" id="td_RegionID_0020">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0020">NRT_PSH_0004</td>
								  <td id="td_TerritoryID_0020">NRT_PSH_PH4_0020</td>							  
								  <td id="td_TerritoryName_0020">Peshawar 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0020">PH4</td>
							</tr>
							<tr id="tr_0021"  onClick={() => displayFields("tr_0021")}>
								  <td class="hidden" id="td_RegionID_0021">NRT_0001</td>
								  <td class="hidden" id="td_ZoneID_0021">NRT_PSH_0004</td>
								  <td id="td_TerritoryID_0021">NRT_PSH_PH5_0021</td>							  
								  <td id="td_TerritoryName_0021">Peshawar 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0021">PH5</td>
							</tr>

							<tr id="tr_0022"  onClick={() => displayFields("tr_0022")}>
								  <td class="hidden" id="td_RegionID_0022">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0022">STH_MUL_0005</td>
								  <td id="td_TerritoryID_0022">STH_MUL_ML1_0022</td>							  
								  <td id="td_TerritoryName_0022">Multan 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0022">ML1</td>
							</tr>
							<tr id="tr_0023"  onClick={() => displayFields("tr_0023")}>
								  <td class="hidden" id="td_RegionID_0023">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0023">STH_MUL_0005</td>
								  <td id="td_TerritoryID_0023">STH_MUL_ML2_0023</td>							  
								  <td id="td_TerritoryName_0023">Multan 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0023">ML2</td>
							</tr>
							<tr id="tr_0024"  onClick={() => displayFields("tr_0024")}>
								  <td class="hidden" id="td_RegionID_0024">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0024">STH_MUL_0005</td>
								  <td id="td_TerritoryID_0024">STH_MUL_ML3_0024</td>							  
								  <td id="td_TerritoryName_0024">Multan 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0024">ML3</td>
							</tr>
							<tr id="tr_0025"  onClick={() => displayFields("tr_0025")}>
								  <td class="hidden" id="td_RegionID_0025">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0025">STH_MUL_0005</td>
								  <td id="td_TerritoryID_0025">STH_MUL_ML4_0025</td>							  
								  <td id="td_TerritoryName_0025">Multan 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0025">ML4</td>
							</tr>
							<tr id="tr_0026"  onClick={() => displayFields("tr_0026")}>
								  <td class="hidden" id="td_RegionID_0026">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0026">STH_MUL_0005</td>
								  <td id="td_TerritoryID_0026">STH_MUL_ML5_0026</td>							  
								  <td id="td_TerritoryName_0026">Multan 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0026">ML5</td>
							</tr>
							
							<tr id="tr_0027"  onClick={() => displayFields("tr_0027")}>
								  <td class="hidden" id="td_RegionID_0027">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0027">STH_SUK_0006</td>
								  <td id="td_TerritoryID_0027">STH_SUK_SK1_0027</td>							  
								  <td id="td_TerritoryName_0027">Sukkur 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0027">SK1</td>
							</tr>
							<tr id="tr_0028"  onClick={() => displayFields("tr_0028")}>
								  <td class="hidden" id="td_RegionID_0028">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0028">STH_SUK_0006</td>
								  <td id="td_TerritoryID_0028">STH_SUK_SK2_0028</td>							  
								  <td id="td_TerritoryName_0028">Sukkur 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0028">SK2</td>
							</tr>
							<tr id="tr_0029"  onClick={() => displayFields("tr_0029")}>
								  <td class="hidden" id="td_RegionID_0029">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0029">STH_SUK_0006</td>
								  <td id="td_TerritoryID_0029">STH_SUK_SK3_0029</td>							  
								  <td id="td_TerritoryName_0029">Sukkur 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0029">SK3</td>
							</tr>
							<tr id="tr_0030"  onClick={() => displayFields("tr_0030")}>
								  <td class="hidden" id="td_RegionID_0030">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0030">STH_SUK_0006</td>
								  <td id="td_TerritoryID_0030">STH_SUK_SK4_0030</td>							  
								  <td id="td_TerritoryName_0030">Sukkur 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0030">SK4</td>
							</tr>
							<tr id="tr_0031"  onClick={() => displayFields("tr_0031")}>
								  <td class="hidden" id="td_RegionID_0031">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0031">STH_SUK_0006</td>
								  <td id="td_TerritoryID_0031">STH_SUK_SK4_0031</td>							  
								  <td id="td_TerritoryName_0031">Sukkur 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0031">SK5</td>
							</tr>

							<tr id="tr_0032"  onClick={() => displayFields("tr_0032")}>
								  <td class="hidden" id="td_RegionID_0032">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0032">STH_HYD_0007</td>
								  <td id="td_TerritoryID_0032">STH_HYD_HD1_0032</td>							  
								  <td id="td_TerritoryName_0032">Hyderabad 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0032">HD1</td>
							</tr>
							<tr id="tr_0033"  onClick={() => displayFields("tr_0033")}>
								  <td class="hidden" id="td_RegionID_0033">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0033">STH_HYD_0007</td>
								  <td id="td_TerritoryID_0033">STH_HYD_HD2_0033</td>							  
								  <td id="td_TerritoryName_0033">Hyderabad 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0033">HD2</td>
							</tr>
							<tr id="tr_0034"  onClick={() => displayFields("tr_0034")}>
								  <td class="hidden" id="td_RegionID_0034">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0034">STH_HYD_0007</td>
								  <td id="td_TerritoryID_0034">STH_HYD_HD3_0034</td>							  
								  <td id="td_TerritoryName_0034">Hyderabad 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0034">HD3</td>
							</tr>
							<tr id="tr_0035"  onClick={() => displayFields("tr_0035")}>
								  <td class="hidden" id="td_RegionID_0035">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0035">STH_HYD_0007</td>
								  <td id="td_TerritoryID_0035">STH_HYD_HD4_0035</td>							  
								  <td id="td_TerritoryName_0035">Hyderabad 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0035">HD4</td>
							</tr>
							<tr id="tr_0036"  onClick={() => displayFields("tr_0036")}>
								  <td class="hidden" id="td_RegionID_0036">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0036">STH_HYD_0007</td>
								  <td id="td_TerritoryID_0036">STH_HYD_HD5_0036</td>							  
								  <td id="td_TerritoryName_0036">Hyderabad 5</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0036">HD5</td>
							</tr>
							<tr id="tr_0037"  onClick={() => displayFields("tr_0037")}>
								  <td class="hidden" id="td_RegionID_0037">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0037">STH_KHI_0008</td>
								  <td id="td_TerritoryID_0037">STH_KHI_KH1_0037</td>							  
								  <td id="td_TerritoryName_0037">Karachi 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0037">KH1</td>
							</tr>
							<tr id="tr_0038"  onClick={() => displayFields("tr_0038")}>
								  <td class="hidden" id="td_RegionID_00038">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0038">STH_KHI_0008</td>
								  <td id="td_TerritoryID_0038">STH_KHI_KH2_0038</td>							  
								  <td id="td_TerritoryName_0038">Karachi 2</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0038">KH2</td>
							</tr>
							<tr id="tr_0039"  onClick={() => displayFields("tr_0039")}>
								  <td class="hidden" id="td_RegionID_0039">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0039">STH_KHI_0008</td>
								  <td id="td_TerritoryID_0039">STH_KHI_KH3_0039</td>							  
								  <td id="td_TerritoryName_0039">Karachi 3</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0039">KH3</td>
							</tr>
							<tr id="tr_0040"  onClick={() => displayFields("tr_0040")}>
								  <td class="hidden" id="td_RegionID_0040">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0040">STH_KHI_0008</td>
								  <td id="td_TerritoryID_0040">STH_KHI_KH4_0040</td>							  
								  <td id="td_TerritoryName_0040">Karachi 4</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0040">KH4</td>
							</tr>
							<tr id="tr_0041"  onClick={() => displayFields("tr_0041")}>
								  <td class="hidden" id="td_RegionID_0041">STH_0002</td>
								  <td class="hidden" id="td_ZoneID_0041">STH_QTA_0008</td>
								  <td id="td_TerritoryID_0041">STH_QTA_QA1_0041</td>							  
								  <td id="td_TerritoryName_0041">Quetta 1</td>						
								  <td class="hidden" id="td_TerritoryAbbr_0041">QA1</td>
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

export default Territory;
