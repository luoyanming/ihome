$(function() {

	window.COMMON =  {
		init: function() {
			// COMMON.inputBind();
			COMMON.iconDeleteBind();
			COMMON.leftNavBind();
			COMMON.modalBind();
			COMMON.imgMaskBind();
		},
		inputBind: function() {
			var inputItem = $('input');

			inputItem.on('input propertychange', function() {
				var _this = $(this),
					inputVal = _this.val(),
					iconDel = _this.parent().find('.icon-delete');

				if(inputVal == '' || inputVal == undefined || inputVal == null) {
					_this.addClass('input-null');
				} else {
					_this.removeClass('input-null');
				}

				// COMMON.checkForm();
			});
		},
		checkForm: function() {
			var obj = $('.input-null'),
				btnSubmit = $('.form-part .btn-submit');

			if(obj.length > 0) {
				btnSubmit.addClass('button-primary-disable');
			} else {
				btnSubmit.removeClass('button-primary-disable');
			}
		},
		iconDeleteBind: function() {
			var iconDel = $('.icon-delete');

			iconDel.unbind('click');
			iconDel.on('click', function() {
				var _this = $(this),
					inputItem = _this.parent().find('input');

				inputItem.val('').addClass('input-null').focus();

				// COMMON.checkForm();
			});
		},
		leftNavBind: function() {
			var navli = $('.leftnav ul li');

			navli.on('mouseenter', function() {
				var _this = $(this);
				if(_this.find('.active').length > 0) {
					return false;
				}
				_this.find('.subnav-list').stop().slideDown();
			});

			navli.on('mouseleave', function() {
				var _this = $(this);
				if(_this.find('.active').length > 0) {
					return false;
				}
				_this.find('.subnav-list').stop().slideUp();
			});

			$('.btn-leftnav').on('click', function() {
				$('.leftnav').addClass('active');
			});

			$('.leftnav').on('click', function(e) {
				if(e.target.className == 'leftnav active' && e.target.nodeName == 'NAV') {
					$('.leftnav').removeClass('active');
				}
			});
		},
		modalShow: function(obj) {
			$('.modal-mask').fadeIn(200);
			obj.fadeIn(200);
		},
		modalHide: function() {
			$('.modal-mask').fadeOut(200);
			$('.modal-box').fadeOut(200);
		},
		modalBind: function() {
			// $('.modal-mask').on('click', function() {
			// 	COMMON.modalHide();
			// });

			$('.modal-box .btn-close').on('click', function() {
				$('.modal-mask').fadeOut(200);
				$(this).parent().parent().fadeOut(200);
			});
		},
		errMsg: function(obj, msg) {
			obj.html(msg);
		},
		selectBind: function(obj, callback) {
			var selectLi = obj.find('.select-options ul li');

			selectLi.unbind('click');
			selectLi.on('click', function() {
				var _this = $(this),
					selectOptions = _this.parent().parent(),
					selectItem = selectOptions.parent(),
					selectInputHidden = selectItem.find('.input-hidden'),
					selectHolder = selectItem.find('.select-placeholder'),
					select = selectItem.find('.select-select');

				if(_this.hasClass('selected')) {
					return false;
				} else {
					var _index = _this.index(),
						_text = _this.html(),
						_v = _this.attr('data-value');
					if(_index == 0) {
						selectHolder.removeClass('select-yes').addClass('input-null');
					} else {
						selectHolder.addClass('select-yes').removeClass('input-null');
					}
					selectInputHidden.val(_v);
					_this.addClass('selected').siblings().removeClass('selected');
					selectHolder.html(_text);
					select.find('option').eq(_index).attr('selected', true);

					if (typeof callback === "function"){
			            callback(_v);
			        }
				}
			});
		},
		imgMaskBind: function() {
			var imgMask = $('.upload-image .img-mask');

			imgMask.unbind('click');
			imgMask.on('click', function() {
				$('.img-big-modal').remove();
				var imgSrc = $(this).parent().find('img').attr('src');

				var str = '';
				str += '<div class="img-big-modal" style="display: none;">';
				str += '<a href="javascript:void(0);" class="btn-close"></a>';
				str += '<img src="'+ imgSrc +'">';
				str += '</div>';
				$('body').append(str);

				$('.img-big-modal').fadeIn(200);
				COMMON.imgMaskBtnCloseBind();
			});
		},
		createConfirmation: function(ajaxUrl, string, str_ensure, str_cancle, ensure_callback, cancel_callback) {
			if($('.confirmation-mask').length > 0) {
				$('.confirmation-mask').remove();
			}
			if($('#confirmation-modal').length > 0) {
				$('#confirmation-modal').remove();
			}

			var str = '';
			str += '<section class="confirmation-mask"></section>';
			str += '<section class="modal-box" style="width: 400px;" id="confirmation-modal" data-ajax="'+ ajaxUrl +'">';
		    str += '<div class="modal-header">';
	        str += '<h1>提示</h1>';
	        str += '<a href="javascript:void(0);" class="btn-close"></a>';
		    str += '</div>';
		    str += '<div class="modal-content">';
	        str += '<div class="form-part" style="padding-bottom: 40px;">';
            str += '<div class="group-text state state-warning" style="font-size: 16px; text-align: center;">'+ string +'</div>';
            str += '<div class="group-btn clearfix" style="margin-top: 40px; text-align: center">';
            str += '<a href="javascript:void(0);" class="button-primary-able btn-confirmation-modal-ensure" style="display: inline-block; width: auto; padding: 0 30px;">'+ str_ensure +'</a>';
            str += '<a href="javascript:void(0);" class="button-primary-able btn-confirmation-modal-cancle" style="display: inline-block; width: auto; padding: 0 30px; margin: 0 0 0 30px;">'+ str_cancle +'</a>';
            str += '</div>';
	        str += '</div>';
		    str += '</div>';
			str += '</section>';

			$('body').append(str);
			$('.confirmation-mask').fadeIn(200);
			$('#confirmation-modal').fadeIn(200);
			ensure_callback();
			cancel_callback();

            $('#confirmation-modal .btn-close').on('click', function() {
                $('.confirmation-mask').fadeOut(200);
                $('#confirmation-modal').fadeOut(200);
            });
			// COMMON.confirmationEnsure();
			// COMMON.confirmationCancle();
		},
		confirmationEnsure: function() {
			var btnConfirmationModalEnsure = $('.btn-confirmation-modal-ensure');

			btnConfirmationModalEnsure.unbind('click');
			btnConfirmationModalEnsure.on('click', function() {
				var ajaxUrl = $('#confirmation-modal').attr('data-ajax');

				btnConfirmationModalEnsure.addClass('button-primary-disable').html('正在处理...');

				$.ajax({
		            url: ajaxUrl,
		            dataType:"json",
		            type:"get",
		            data: {

		            },
		            success:function(data) {
		            	if(data.code != 200) {
		            		COMMON.createConfirmation(ajaxUrl, data.msg, '重试', '取消', COMMON.confirmationEnsure, COMMON.confirmationCancle);
		            	} else {
		            		location.href = location.href;
		            	}
		            },
		            error: function() {
		                COMMON.createConfirmation(ajaxUrl, '操作失败！', '重试', '取消', COMMON.confirmationEnsure, COMMON.confirmationCancle);
		            }
		        });
			});
		},
		confirmationCancle: function() {
			var btnConfirmationModalCancle = $('.btn-confirmation-modal-cancle');

			btnConfirmationModalCancle.unbind('click');
			btnConfirmationModalCancle.on('click', function() {
				$('.confirmation-mask').fadeOut(200);
				$('#confirmation-modal').fadeOut(200);
			});
		},
		confirmBind: function(obj, string, str_ensure, str_cancle, ensure_callback, cancel_callback){
            var btnEnsure = obj.find('.btn-confirm-modal-ensure'),
            	btnCancle = obj.find('.btn-confirm-modal-cancle');

			obj.find('.group-text').html(string);
			btnEnsure.html(str_ensure);
			btnCancle.html(str_cancle);

            $('.modal-mask').fadeIn(200);
            obj.fadeIn(200);

            btnEnsure.unbind('click');
            btnEnsure.on('click', function() {
	            if (typeof ensure_callback == 'function') {
	            	ensure_callback();
	            }
            });

            btnCancle.unbind('click');
            btnCancle.on('click', function() {
	            if (typeof cancel_callback == 'function') {
	                cancel_callback();
	            }
            });
        },
		imgMaskBtnCloseBind: function() {
			var btnImgMaskCloseBtn = $('.img-big-modal .btn-close');
			btnImgMaskCloseBtn.unbind('click');
			btnImgMaskCloseBtn.on('click', function() {
				$('.img-big-modal').fadeOut(200);
			});
		},
		fileUploadBind: function(ajaxUrl, callback) {
			if($('#btn-file-upload').length > 0) {
				$('#btn-file-upload').html('数据导入<form id="form-file-upload"><input type="file" class="input-file file-upload" name="file"></form>');
				COMMON.createModalUpload(ajaxUrl, callback);
			}
		},
		createModalUpload: function(ajaxUrl, callback) {
			var str = '';
			str += '<section class="modal-upload" id="modal-upload-progress">';
		    str += '<div class="upload-box">';
	        str += '<a href="javascript:void(0);" class="btn-close"></a>';
	        str += '<div class="progress">';
	        str += '<div class="progress-bar"></div>';
	        str += '</div>';
	        str += '<div class="progress-text">数据导入...</div>';
		    str += '</div>';
			str += '</section>';

			str += '<section class="modal-upload" id="modal-upload-succ">';
		    str += '<div class="upload-box" style="width: 240px; border-radius: 4px;">';
		    str += '<div class="succ">数据导入成功</div>';
		    str += '</div>';
			str += '</section>';

			str += '<section class="modal-upload" id="modal-upload-fail">';
		    str += '<div class="upload-box">';
	        str += '<a href="javascript:void(0);" class="btn-close"></a>';
	        str += '<div class="fail">';
            str += '<div class="title">数据上传失败</div>';
            str += '<div class="msg">失败原因失败原因失败原因失败原因失败原因</div>';
            str += '<a href="javascript:void(0);" class="button-primary-able button-small">重新上传</a>';
	        str += '</div>';
		    str += '</div>';
			str += '</section>';

			$('body').append(str);

			var btnUpload = $('#btn-file-upload'),
				fileUpload = btnUpload.find('.file-upload'),
				modalUpload = $('.modal-upload'),
	            btnModalUploadClose = modalUpload.find('.btn-close'),
	            modalUplodaProgress = $('#modal-upload-progress'),
	            progressBar = modalUplodaProgress.find('.progress-bar'),
	            modalUploadSucc = $('#modal-upload-succ'),
	            modalUploadFail = $('#modal-upload-fail'),
	            modalUploadFailMsg = modalUploadFail.find('.msg'),
	            modalUploadFailButton = modalUploadFail.find('.button-primary-able');

	        btnModalUploadClose.unbind('click');
			btnModalUploadClose.on('click', function() {
                modalUpload.fadeOut(200);
                COMMON.fileUploadBind(ajaxUrl);
            });

            modalUploadFailButton.unbind('click');
            modalUploadFailButton.on('click', function() {
                modalUploadFail.hide();
                COMMON.fileUploadBind(ajaxUrl);
                btnUpload.find('.file-upload').click();
            });

            fileUpload.unbind('change');
            fileUpload.change(function() {
                var formData = new FormData($('#form-file-upload')[0]);

                $.ajax({
                    url: ajaxUrl,
                    type: 'POST',
                    data: formData,
                    dataType: 'JSON',
                    async: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    xhr: function() {
                        var xhr = $.ajaxSettings.xhr();

                        xhr.upload.onloadstart = function(){
                            modalUplodaProgress.fadeIn(200);
                        };

                        xhr.upload.onprogress = COMMON.onprogress;

                        return xhr;
                    },  
                    success: function (data) {
                        if(data.code == 200) {
                            modalUplodaProgress.hide();
                            modalUploadSucc.fadeIn(200);

                            if (typeof callback === "function"){
                            	var SuccXf = setTimeout(function() {
	                                modalUploadSucc.fadeOut(200);
	                            },2000);
                            	callback(data.list);
                            } else {
                            	var SuccXf = setTimeout(function() {
	                                location.href = location.href;
	                            },2000);
                            }
                        } else {
                            modalUplodaProgress.hide();
                            modalUploadFailMsg.html(data.msg);
                            modalUploadFail.fadeIn(200);
                        }
                    },
                    error: function () {
                        modalUplodaProgress.hide();
                        modalUploadFailMsg.html('网络连接断开，请重试！');
                        modalUploadFail.fadeIn(200);
                    }
                });
            });
		},
		onprogress: function(evt) {
            var loaded = evt.loaded,
                total = evt.total,
                per = Math.floor(100*loaded/total);

            $('#modal-upload-progress .progress-bar').css('width' , per + '%');
        },
		checkNull: function(value){
			if(value == '' || value == undefined || value == null){
				return false;
			}else{
				return true;
			}
		},
		checkMobile: function(mobile){
			var re = /^1\d{10}$/;
			if (re.test(mobile)) {
				return true;
			} else {
				return false;
			}
		},
		checkIDCards: function(idcards) {
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
		   	if(reg.test(idcards) === false) {
		       return  false;
		   	} else {
		   		return true;
		   	}
		},
		checkInit: function(initNumber, codeType) {
			var reg = '';
			if(codeType) {
	        	reg = /^\+?[0-9][0-9]*$/;
			} else {
		        reg = /^\+?[1-9][0-9]*$/;
			}

	        if(!reg.test(initNumber)) {
	            return false;
	        } else {
	        	return true;
	        }
		},
		checkPositive: function(positiveNumber) {
	        var reg = /^\d+(\.\d+)?$/;

	        if(!reg.test(positiveNumber)) {
	            return false;
	        } else {
	        	return true;
	        }
		},
		getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        post: function(URL, PARAMS) {
		    var temp = document.createElement("form");
		    temp.action = URL;
		    temp.method = "post";
		    temp.style.display = "none";
		    for (var x in PARAMS) {
		        var opt = document.createElement("textarea");
		        opt.name = x;
		        opt.value = PARAMS[x];
		        temp.appendChild(opt);
		    }
		    document.body.appendChild(temp);
		    temp.submit();
		    return temp;
		}
	};

	COMMON.init();
});