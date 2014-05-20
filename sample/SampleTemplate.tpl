/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

{Template {
    $classpath: "SampleTemplate"
}}

    {macro main()}

        {var data = {
            images : [
                {src : "images/p1.jpg", title : "This is the caption for the first picture"},
                {src : "images/p2.jpg", title : "...some text for the second picture..."},
                {src : "images/p3.jpg", title : "...and some more for the last one."}]
        }/}

        {@widget:Carousel {
            width: 800,
            height: 250,
            titleheight: 40,
            images: data.images,
			cssClass: "slides",
			loop: {
				speed: 6
			},
            bind: {
                index: {to:"curimg", inside:data}
            }
        }/}

		{section {
			type: "nav",
			bindRefreshTo: [ {to:"curimg", inside:data} ],
			macro: "bullets"
		}/}

    {/macro}


    {macro bullets()}
		{foreach img in data.images}
			<a ${img_index == data.curimg ? 'class="current"' : ''|escapeForHTML:false}
				href="#"
				{on click new Function('aria.utils.Json.setValue(this.data, "curimg", ' + img_index + ');') /}>
				${img_index * 1 + 1}
			</a>
		{/foreach}
    {/macro}

{/Template}
