import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
  //https://www.youtube.com/watch?v=yDgbt4SAjIc 17
  @ViewChild('videoPlayer') mVideoPlayer: any;
  @ViewChild('canvas1') mCanvas1: any;
  @ViewChild('canvas2') mCanvas2: any;

  public urlVideo: string;
  public videoPlayer: any;
  public c1: any;
  public ctx1: any;

  constructor(public navCtrl: NavController) {
    this.urlVideo = 'assets/video/VfE_html5.mp4';
  }

  ngOnInit() {
    this.videoPlayer = this.mVideoPlayer.nativeElement;
    this.c1 = this.mCanvas1.nativeElement;
    //this.c1.width = this.videoPlayer.videoWidth;
    //this.c1.height = this.videoPlayer.videoHeight;
    this.ctx1 = this.c1.getContext('2d');

    this.videoPlayer.src = this.urlVideo;
    this.videoPlayer.onplay = () => {
      this.timerCallback();
    };

    this.videoPlayer.onpause = () => {
    }
  }

  timerCallback() {
    if (this.videoPlayer.paused || this.videoPlayer.ended) {
      return;
    }

    this.computeFrame();
    let self = this;
    setTimeout(function() {
      self.timerCallback();
    }, 0);
  }

  computeFrame() {
    //this.ctx1.width = this.videoPlayer.videoWidth;
    //this.ctx1.height = this.videoPlayer.videoHeight;
    this.ctx1.drawImage(this.videoPlayer, 0, 0, (this.videoPlayer.videoWidth / 2), (this.videoPlayer.videoHeight /2));
    return;
  }

  resize() {
    console.log(this.videoPlayer);
    this.c1.width = this.videoPlayer.videoWidth;
    this.c1.height = this.videoPlayer.videoHeight;
  }

  changeSpeed(speed: number) {
    this.videoPlayer.playbackRate = speed;
  }

  backTime(time) {
    this.videoPlayer.currentTime += -time;
  }
}
