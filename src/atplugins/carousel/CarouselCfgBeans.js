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

Aria.beanDefinitions({
    $package : "atplugins.carousel.CarouselCfgBeans",
    $description : "Definition of the beans used in the Carousel widget config",
    $namespaces : {
        "json" : "aria.core.JsonTypes"
    },
    $beans : {

        // TODO reuse the base BindingRef and implement transform
        "BindingRef" : {
            $type : "json:Object",
            $description : "Description of a Binding",
            $properties : {
                "to" : {
                    $type : "json:JsonProperty",
                    $description : "Name of the JSON property to bind to"
                },
                "inside" : {
                    $type : "json:ObjectRef",
                    $description : "Reference to the object that holds the property to bind to"
                }
            }
        },

        "ImageDef" : {
            $type : "json:Object",
            $description : "Image with a caption",
            $properties : {
                "src" : {
                    $type : "json:String",
                    $description : "Image path.",
                    $sample : "static/img/mypic.jpg"
                },
                "title" : {
                    $type : "json:String",
                    $description : "Image caption.",
                    $sample : "Description of the image"
                }
            }
        },

        "CarouselCfg" : {
            $type : "json:Object",
            $description : "Configuration of the carousel widget.",
            $properties : {
                "width" : {
                    $type : "json:Integer",
                    $description : "Width of the widget.",
                    $mandatory : true
                },
                "height" : {
                    $type : "json:Integer",
                    $description : "Height of the widget.",
                    $mandatory : true
                },
                "titleheight" : {
                    $type : "json:Integer",
                    $description : "Height of images captions.",
                    $default: 30
                },
                "images" : {
                    $type : "json:Array",
                    $description : "Array of images objects or paths.",
                    $mandatory : true,
                    $contentType : {
                        $type : "json:MultiTypes",
                        $description : "Image object or path.",
                        $contentTypes : [{
                            $type : "json:String",
                            $description : "Image path.",
                            $sample : "static/img/mypic.jpg"
                        },{
                            $type : "ImageDef",
                            $description : "Image path and caption."
                        }]
                    }
                },
                "loop" : {
                    $type : "json:Object",
                    $description : "Parameters of the slideshow.",
                    $default: {type:"continuous", direction:true, speed:0},
                    $properties : {
                        "type" : {
                            $type : "json:Enum",
                            $description : "Behavior after first/last image is reached: [stop]: nothing happens, [continuous]: seamless loop (default), [rewind]: scroll back to last/first image, [reverse]: switches direction.",
                            $enumValues : ["stop", "continuous", "rewind", "reverse"],
                            $default: "continuous"
                        },
                        "direction" : {
                            $type : "json:Boolean",
                            $description : "When speed is set, defines the direction of the slideshow: true=right to left (default), false:left to right.  If loop type is 'reverse' this indicates the starting direction.",
                            $default: true
                        },
                        "speed" : {
                            $type : "json:Integer",
                            $description : "Duration in seconds of the display between transitions (default: 0 meaning no automatic slideshow.)",
                            $default: 0
                        }
                    }
                },
                "index" : {
                    $type : "json:Integer",
                    $description : "Index of the image to be displayed first.",
                    $default: 0
                },
                "cssClass" : {
                    $type : "json:String",
                    $description : "Optional CSS class to apply to the carousel container."
                },
                "transitionCSS" : {
                    $type : "json:String",
                    $description : "The part of the CSS declaration defining the duration and timing of the transition.",
                    $default: "0.5s ease-out",
                    $sample : "1s ease-in-out"
                },
                bind : {
                    $type : "json:Object",
                    $description : "Bindable properties.",
                    $properties : {
                        "loop" : {
                            $type : "BindingRef"
                        },
                        "index" : {
                            $type : "BindingRef"
                        }
                    }
                }
            }
        }

    }
});
