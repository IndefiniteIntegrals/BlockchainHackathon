//
//  ViewController.swift
//  SpriteKitUIKit
//
//  Created by Rickey Hrabowskie on 10/31/16.
//  Copyright © 2016 Rickey Hrabowskie. All rights reserved.
//

import UIKit
import SpriteKit

class ViewController: UIViewController {

    @IBOutlet weak var sceneView: SKView!
    
    var scene:BeeScene?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        self.scene = BeeScene(size: CGSize(width: self.sceneView.frame.size.width, height: self.sceneView.frame.size.height))
        self.sceneView.presentScene(scene) 
    }
    
    @IBAction func buyCar(_ sender: UIButton) {
        if let scene = self.scene {
            scene.flyBee()
          scene.flyBee()
            
        }
        unowned let unownedSelf = self
        
        let deadlineTime = DispatchTime.now() + .seconds(3)
        DispatchQueue.main.asyncAfter(deadline: deadlineTime, execute: {
            unownedSelf.performSegue(withIdentifier: "buy", sender: self)
        })
    
        
    }
    
    
    @IBAction func sellCar(_ sender: UIButton) {
        if let scene = self.scene {
            scene.flyBee()
            scene.flyBee()
        }
        unowned let unownedSelf = self
        
        let deadlineTime = DispatchTime.now() + .seconds(3)
        DispatchQueue.main.asyncAfter(deadline: deadlineTime, execute: {
            unownedSelf.performSegue(withIdentifier: "sell", sender: self)
        })
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

